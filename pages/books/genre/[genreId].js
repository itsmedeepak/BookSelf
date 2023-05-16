import { useState, useEffect, useContext, useRef, Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useWindowWidth from '../../../hooks/useWindowWidth'
import { getGenreBooks, getTopGenres } from '../../../API/genres'
import { favouriteGenre, getLibraryGenres } from '../../../API/userLibrary'
import UserContext from '../../../store/userContext'
import SpinnerContext from '../../../store/spinnerContext'
import SnackbarContext from '../../../store/snackbarContext'
import ListGridModal from '../../../components/modals/ListGridModal'
import TopNavModal from '../../../components/modals/TopNavModal'
import Paginate from '../../../components/ui/Paginate'
import HeartIcon from '../../../assets/icons/HeartIcon'

function GenreBooksPage(props) {
	const { toggleSpinner } = useContext(SpinnerContext)
	const { user } = useContext(UserContext)
	const snackbarCtx = useContext(SnackbarContext)
	const coverRef = useRef()
	const pageRef = useRef(null)
	const router = useRouter()
	const windowWidth = useWindowWidth()
	const { genre, slug } = props
	const [books, setBooks] = useState([])
	const [isFavourite, setFavourite] = useState(false)
	const [loadingFavourite, setLoadingFavourite] = useState(false)

	useEffect(() => {
		;(async () => {
			const page = router.query.page
			if (page) {
				toggleSpinner(true)
				const res = await getGenreBooks(slug, { page })
				setBooks(res.data.books)
				toggleSpinner(false)
			}
		})()
		if (!books?.length) {
			setBooks(props.books)
		}
	}, [router.asPath, props.books])

	useEffect(() => {
		if (!isFavourite && user?.data) {
			;(async () => {
				setLoadingFavourite(true)
				const library = await getLibraryGenres()
				if (!library.genres) snackbarCtx.addMessage({ title: library, status: 'invalid' })
				else {
					if (library.genres.find((g) => g.slug === slug)) setFavourite(true)
					else setFavourite(false)
				}
				setLoadingFavourite(false)
			})()
		}
	}, [])

	const favouriteGenreHandler = async () => {
		if (!user?.data) {
			snackbarCtx.addMessage({ title: 'Please login to save favourite genres', status: 'invalid' })
			return
		}
		if (loadingFavourite) return
		setFavourite(!isFavourite)
		setLoadingFavourite(true)
		const library = await favouriteGenre(slug)
		if (!library.genre) {
			snackbarCtx.addMessage({ title: library, status: 'fail' })
			setFavourite((isFavourite) => !isFavourite)
			setLoadingFavourite(false)
			return
		}
		if (library.genre === 'saved')
			snackbarCtx.addMessage({ title: 'Genre saved in your library', status: 'success' })
		else snackbarCtx.addMessage({ title: 'Genre removed from your library', status: 'success' })
		setLoadingFavourite(false)
	}

	return genre ? (
		<Fragment>
			<Head>
				<title>{genre + ' books'}</title>
				<meta name='description' content={`${genre} books section`} />
			</Head>
			<div className='pb-16 xl:pb-8' ref={pageRef}>
				{windowWidth < 1280 && (
					<TopNavModal
						rightIcon={
							<div onClick={favouriteGenreHandler}>
								{isFavourite ? (
									<HeartIcon dimensions='h-7 w-7' color='white' />
								) : (
									<HeartIcon dimensions='h-7 w-7' color='' />
								)}
							</div>
						}
						pageTitle={genre}
						coverRef={coverRef}
						pageRef={pageRef}
					/>
				)}
				<ListGridModal
					listTitle={`${genre} books`}
					books={books}
					coverRef={coverRef}
					rightIcon={
						<div onClick={favouriteGenreHandler}>
							{isFavourite ? (
								<HeartIcon dimensions='h-8 w-8' color='white' />
							) : (
								<HeartIcon dimensions='h-8 w-8' color='' />
							)}
						</div>
					}
				/>
				{books?.length >= 30 && <Paginate totalPages={4} page={1} />}
			</div>
		</Fragment>
	) : (
		<></>
	)
}

export async function getStaticProps(context) {
	const { params } = context
	const genre = await getGenreBooks(params.genreId)

	if (!genre.data) {
		return { notFound: true }
	}

	return {
		props: {
			genre: genre.data.title,
			slug: genre.data.slug,
			books: genre.data.books,
		},
	}
}

export async function getStaticPaths() {
	const genres = await getTopGenres()

	const genreParams = genres.data.map((genre) => ({
		params: { genreId: genre.slug.toString() },
	}))

	return {
		paths: genreParams,
		fallback: true,
	}
}

export default GenreBooksPage
