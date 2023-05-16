import { useState, useEffect, useRef, useContext, Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useWindowWidth from '../../hooks/useWindowWidth'
import { getAuthorDetails, getTopAuthors } from '../../API/authors'
import { followAuthor, getLibraryAuthors } from '../../API/userLibrary'
import UserContext from '../../store/userContext'
import SnackbarContext from '../../store/snackbarContext'
import BgCover from '../../components/modals/BgCover'
import { pickBgColor } from '../../utils/helpers/pickBgColor'
import ListGridModal from '../..//components/modals/ListGridModal'
import GenreListModal from '../../components/modals/GenreListModal'
import TopNavModal from '../../components/modals/TopNavModal'
import ShareButton from '../../components/buttons/ShareButton'
import StarIcon from '../../assets/icons/StarIcon'
import HeartIcon from '../../assets/icons/HeartIcon'
import ChevronUpIcon from '../../assets/icons/ChevronUpIcon'
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon'

function AuthorDetailPage(props) {
	const { author } = props
	const { user } = useContext(UserContext)
	const snackbarCtx = useContext(SnackbarContext)
	const [readMoreBio, setReadMoreBio] = useState(false)
	const [bioLines, setBioLines] = useState(0)
	const windowWidth = useWindowWidth()
	const [isFollowing, setFollowing] = useState(false)
	const [loadingFollow, setLoadingFollow] = useState(false)
	const [editReview, setEditReview] = useState(false)

	const router = useRouter()
	const bioRef = useRef(null)
	const coverRef = useRef(null)

	const readMoreBioHandler = () => {
		const bioEl = bioRef.current
		if (bioEl) {
			bioEl.style.display = 'inline'
			setBioLines(bioEl.getClientRects().length)
			bioEl.style.display = '-webkit-box'
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && bioRef) {
			readMoreBioHandler()
			window.addEventListener('orientationchange', readMoreBioHandler, false) // bioLines incorrect value
		}
	}, [bioRef?.current, author?.biography]) //remove author?.biography later

	useEffect(() => {
		if (!isFollowing && user?.data && author) {
			;(async () => {
				setLoadingFollow(true)
				const library = await getLibraryAuthors()
				if (!library.authors) snackbarCtx.addMessage({ title: library, status: 'invalid' })
				else {
					if (library.authors.find((a) => a.slug === author.slug)) setFollowing(true)
					else setFollowing(false)
				}
				setLoadingFollow(false)
			})()
		}
	}, [author])

	const followAuthorHandler = async () => {
		if (!user?.data) {
			snackbarCtx.addMessage({ title: 'Please login to save followed authors', status: 'invalid' })
			return
		}
		if (loadingFollow) return
		setLoadingFollow(true)
		setFollowing(!isFollowing)
		const library = await followAuthor(author.slug)
		if (!library.author) {
			snackbarCtx.addMessage({ title: library, status: 'fail' })
			setFollowing((isFollowing) => !isFollowing)
			setLoadingFollow(false)
			return
		}
		if (library.author === 'followed')
			snackbarCtx.addMessage({ title: 'Author saved in your library', status: 'success' })
		else snackbarCtx.addMessage({ title: 'Author removed from your library', status: 'success' })
		setLoadingFollow(false)
	}

	const shareAuthorHandler = async () => {
		if (navigator?.share && window.location.origin) {
			await navigator.share({
				title: author.name,
				url: window.location.origin + router.asPath,
			})
		} else {
			snackbarCtx.addMessage({
				title: 'Sorry! Web Share API is not supported in this browser',
				status: 'fail',
			})
		}
	}

	return author ? (
		<Fragment>
			<Head>
				<title>{author.name}</title>
				<meta name='bioription' content='Author detail page' />
			</Head>

			<div className='cover-page-bg pb-16 xl:pb-8'>
				{windowWidth < 1280 && (
					<TopNavModal
						rightIcon={<ShareButton title={author.name} />}
						pageTitle={author.name}
						coverRef={coverRef}
					/>
				)}
				<BgCover color={props.color} coverRef={coverRef}>
					<div className='flex items-center justify-center w-full xl:max-w-2xl p-2 pt-11 xl:pt-4 gap-2 ms:gap-3 md:gap-4'>
						<div className='flex justify-end min-w-max h-full'>
							<Image
								src={process.env.AUTHORS_URL + author.image}
								alt={author.name}
								height={280}
								width={280}
								className='object-cover rounded-full w-32 h-32 xl:w-48 xl:h-48'
							/>
						</div>
						<div className='p-1 space-y-4 xl:max-w-xs xl:min-w-[16rem]'>
							<div>
								<h2 className='text-xl md:text-3xl xl:text-4xl font-medium'>{author.name}</h2>
							</div>
							{author.ratingsAvg ? (
								<div className='flex items-center justify-start text-md md:text-lg text-xl w-full font-medium'>
									<div className='mr-1 xl:mr-2'>
										<StarIcon dimensions='h-6 w-6' />
									</div>
									{author.ratingsAvg}
								</div>
							) : (
								<></>
							)}
							{author.origin ? (
								<div className='text-sm md:text-md xl:text-xl italic'>Born {author.origin}</div>
							) : (
								<></>
							)}
						</div>
					</div>

					<div className='xl:min-w-[20rem]'>
						<div className='flex xl:flex-col items-end justify-center relative w-fit xl:min-h-[12rem] text-white'>
							<div className='hidden xl:flex absolute top-0 right-0 cursor-pointer'>
								<ShareButton title={author.name} />
							</div>
							{isFollowing ? (
								<button className='btn-inactive' onClick={followAuthorHandler}>
									<HeartIcon dimensions='h-7 w-7' />
									<span className='font-semibold pr-2'>Following</span>
								</button>
							) : (
								<button className='btn-active' onClick={followAuthorHandler}>
									<HeartIcon dimensions='h-7 w-7' />
									<span className='font-semibold pr-2'>Follow</span>
								</button>
							)}
						</div>
					</div>
				</BgCover>

				<GenreListModal genres={author.genres} />

				{author.biography ? (
					<div className='p-4 md:p-6'>
						<h4 className='text-xl md:text-2xl py-2 font-semibold'>About the author</h4>
						<p
							ref={bioRef}
							className={
								'text-md text-gray-200 font-medium sm:leading-snug leading-normal' +
								(!readMoreBio ? ' line-clamp-3' : '')
							}>
							{author.biography}
						</p>
						<button
							onClick={(e) => {
								setReadMoreBio(!readMoreBio)
								e.preventDefault()
							}}
							className={
								'cursor-pointer text-sm xl:text-base font-semibold text-[#AA14F0] underline decoration-1 underline-offset-2 decoration-gray-300 ' +
								(bioLines <= 4 ? 'hidden' : '')
							}>
							{readMoreBio ? (
								<div className='flex'>
									Read less <ChevronUpIcon dimensions='h-5 w-5' />
								</div>
							) : (
								<div className='flex'>
									Read more{' '}
									<div className='py-1'>
										<ChevronDownIcon dimensions='h-5 w-5' />
									</div>
								</div>
							)}
						</button>
					</div>
				) : (
					<></>
				)}

				{author.books?.length ? <ListGridModal listTitle='Author Books' books={author.books} /> : <></>}
			</div>
		</Fragment>
	) : (
		<></>
	)
}

export async function getStaticProps(context) {
	const { params } = context
	const author = await getAuthorDetails(params.authorId)

	if (!author.data) {
		return { notFound: true }
	}

	const bgColor = pickBgColor(author.data.slug)

	return {
		props: {
			author: author.data,
			color: bgColor,
		},
	}
}

export async function getStaticPaths() {
	const authors = await getTopAuthors()

	const authorParams = authors.data?.map((author) => ({
		params: { authorId: author.slug.toString() },
	}))

	return {
		paths: authorParams,
		fallback: true,
	}
}

export default AuthorDetailPage
