import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function NotFoundPage() {
	const [pathname, setPathname] = useState()
	const router = useRouter()

	useEffect(() => {
		setPathname(router.asPath)
	}, [router.asPath])

	return (
		<main className='grid min-h-full place-items-center page-gradient px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-xl font-semibold text-[#8C6AFF]'>404</p>
				<h1 className='mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white'>Page not found</h1>
				<p className='mt-6 text-base text-gray-500'>Sorry, we couldn’t find the page you’re looking for.</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					{pathname !== '/' ? (
						<Link href='/'>
							<div className='rounded-md bg-[#8C6AFF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6AFF]'>
								Go back home
							</div>
						</Link>
					) : (
						<Fragment />
					)}
				</div>
			</div>
		</main>
	)
}

export default NotFoundPage
