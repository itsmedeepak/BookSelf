import { useState, useEffect, useRef, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getBookDetails } from '../../../API/books'
import { addReadHistory } from '../../../API/userLibrary'
import { ReactReader, ReactReaderStyle } from 'react-reader'
import BookContext from '../../../store/bookContext'
import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon'
import PlusCircleIcon from '../../../assets/icons/PlusCircleIcon'
import MinusCircleIcon from '../../../assets/icons/MinusCircleIcon'
import readerStyles from '../../../utils/constants/readerStyles'

function BookReaderPage() {
	const router = useRouter()
	const bookCtx = useContext(BookContext)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [ebookLink, setEbookLink] = useState('')
	const [size, setSize] = useState(100)
	const [loadHistory, setLoadHistory] = useState(false)

	useEffect(() => {
		if (bookCtx.book.title && !title) {
			setTitle(bookCtx.book.title)
			setAuthor(bookCtx.book.author?.name)
			setEbookLink(process.env.EBOOK_URL + bookCtx.book.format?.ebook.link)
		} else if (bookCtx.book && router.asPath.includes('-')) {
			;(async () => {
				try {
					const bookId = router.asPath.split('/books/')[1]?.split('/read')[0]
					const book = await getBookDetails(bookId)
					if (!book.data) router.push(`/books/${bookId}`)
					else {
						bookCtx.addBook(book.data)
					}
				} catch (err) {
					console.log('Error', err)
					router.push('/')
				}
			})()
		}
	}, [bookCtx.book, router.asPath])

	useEffect(() => {
		setLoadHistory(() => true)
		if (loadHistory) {
			setTimeout(async () => {
				await addReadHistory(bookCtx.book.slug)
			}, 2000)
		}
	}, [loadHistory])

	const bookCloseHandler = () => {
		bookCtx.setActiveBook('read')
		bookCtx.setActiveListen(false)
		router.back()
	}

	const [location, setLocation] = useState(null)
	const [pageDetails, setPageDetails] = useState('')
	const renditionRef = useRef(null)
	const tocRef = useRef(null)

	useEffect(() => {
		if (renditionRef.current) {
			renditionRef.current.themes.fontSize(`${size}%`)
		}
	}, [size])

	const changeSize = (newSize) => {
		setSize(newSize)
	}

	const locationChanged = (epubCifi) => {
		setLocation(epubCifi)
		if (renditionRef.current.location?.start && tocRef.current) {
			const { displayed, href } = renditionRef.current.location.start
			const chapter = tocRef.current.find((item) => item.href === href)
			setPageDetails(
				`Page ${displayed.page} of ${displayed.total} ${chapter ? 'in chapter ' + chapter.label : ''}`
			)
		}
	}

	//bg-#fbf0d9

	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta name='description' content='Ebook reader page' />
			</Head>
			<div className='relative h-screen w-screen xl:h-full xl:w-full'>
				<ReactReader
					title={title + ' by ' + author}
					location={location}
					locationChanged={locationChanged}
					url={ebookLink}
					readerStyles={{ ...ReactReaderStyle, ...readerStyles }}
					tocChanged={(toc) => (tocRef.current = toc)}
					epubOptions={{
						flow: 'scrolled',
						manager: 'continuous',
					}}
					getRendition={(rendition) => {
						rendition.themes.register('custom', {
							'*': {
								color: 'white',
								background: '#080e19', //#fbf0d9
							},
						})
						rendition.themes.select('custom')
						renditionRef.current = rendition
					}}
				/>
				<div className='absolute flex items-center justify-between bottom-0 w-full rounded-t-md z-20 text-[#8C6AFF] bg-[#111826]'>
					<p className='mx-3 my-2 w-full z-50'>{pageDetails}</p>

					<div className='flex h-full w-56 z-10 rounded-md bg-[#0C111B] bg-opacity-90'>
						<div className='absolute bottom-0 right-0  flex items-center justify-center '>
							<button
								className={'mx-3 my-1 ' + (size <= 70 && 'opacity-60')}
								onClick={() => changeSize(Math.max(70, size - 10))}>
								<MinusCircleIcon dimensions='w-7 h-7' />
							</button>
							<span className='text-lg xl:text-xl z-0 font-medium'>{size}%</span>
							<button
								className={'mx-3 my-1 ' + (size >= 150 && 'opacity-60')}
								onClick={() => changeSize(Math.min(150, size + 10))}>
								<PlusCircleIcon dimensions='w-7 h-7' color='#0C111B' />
							</button>
						</div>
					</div>
				</div>
				<div
					className='group absolute top-1 right-1 z-10 xl:top-2 xl:right-5 p-1 m-0.5 xl:m-1 xl:scale-110 flex items-center justify-center bg-gray-400 bg-opacity-10 rounded-full hover:cursor-pointer hover:-translate-y-0.5 transition duration-150'
					onClick={bookCloseHandler}>
					<ChevronDownIcon dimensions='h-5 w-5' stroke='white' />
				</div>
			</div>
		</Fragment>
	)
}

export default BookReaderPage
