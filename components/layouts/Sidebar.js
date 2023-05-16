import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import UserContext from '../../store/userContext'
import Logo from '../buttons/Logo'
import HomeIcon from '../../assets/icons/HomeIcon'
import DiscoverIcon from '../../assets/icons/DiscoverIcon'
import LibraryIcon from '../../assets/icons/LibraryIcon'
import AccountIcon from '../../assets/icons/AccountIcon'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon'
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon'
import CollectionIcon from '../../assets/icons/CollectionIcon'
import HeartIcon from '../../assets/icons/HeartIcon'
import HistoryIcon from '../../assets/icons/HistoryIcon'
import SettingsIcon from '../../assets/icons/SettingsIcon'
import HelpIcon from '../../assets/icons/HelpIcon'
import FeedbackIcon from '../../assets/icons/FeedbackIcon'
import PlusCircleIcon from '../../assets/icons/PlusCircleIcon'

function Sidebar() {
	const [libraryToggle, setLibraryToggle] = useState(true)
	const router = useRouter()
	const currentRoute = router.asPath
	const paths = ['login', 'signup', 'update']
	const showRoute = !paths.find((path) => currentRoute.includes(path))

	const { user } = useContext(UserContext)
	const [activeUser, setActiveUser] = useState(null)

	useEffect(() => {
		setActiveUser(user?.data)
		// if (!activeUser?.data) getUserProfile()
	}, [user])

	const routeClassHandler = (route) => {
		return `flex items-center w-5/6 space-x-2 m-2 hover:text-white text-${
			(currentRoute.includes(route) && route !== '/') || currentRoute === route ? 'white ' : 'gray-400 '
		}`
	}

	return (
		showRoute && (
			<div className='inline-block sticky top-0 min-h-[40rem] h-screen w-[13.5vw] max-w-[20rem] overflow-x-hidden hide-scrollbar select-none bg-[#030b17] space-y-5 p-2'>
				<div className='flex items-center space-x-20'>
					<Logo size={46} />
				</div>
				<Link href='/'>
					<div className={routeClassHandler('/') + 'my-4'}>
						<HomeIcon dimensions='h-7 w-7' />
						<p className='text-base'>Home</p>
					</div>
				</Link>
				<Link href='/'>
					<div className={routeClassHandler('/discover') + 'my-4'}>
						<DiscoverIcon dimensions='h-7 w-7' />
						<p className='text-base'>Discover</p>
					</div>
				</Link>
				<hr className='border-t-[0.1px] border-gray-800 w-full' />
				<div className='flex flex-col'>
					<div className='flex w-full'>
					<Link href='/'>
							<div className={routeClassHandler('/library') + ' pr-2'}>
								<LibraryIcon dimensions='h-7 w-7' />
								<p className='text-base'>Library</p>
							</div>
						</Link>
						{activeUser ? (
							<div
								className={'flex items-center mr-2 cursor-pointer'}
								onClick={() => setLibraryToggle(!libraryToggle)}>
								{libraryToggle ? (
									<ChevronDownIcon dimensions='h-6 w-6' color='#999999' stroke='#999999' />
								) : (
									<ChevronRightIcon dimensions='h-6 w-6' color='#999999' stroke='#999999' />
								)}
							</div>
						) : (
							<></>
						)}
					</div>
					{activeUser && libraryToggle ? (
						<div className='ml-2'>
							<Link href='/'>
								<div className={routeClassHandler('/collections')}>
									<CollectionIcon dimensions='h-7 w-7' />
									<p className='text-base'>Collections</p>
								</div>
							</Link>
							<Link href='/'>
								<div className={routeClassHandler('/favourites')}>
									<HeartIcon dimensions='h-7 w-7' />
									<p className='text-base'>Favourites</p>
								</div>
							</Link>
							<Link href='/'>
								<div className={routeClassHandler('/read-history')}>
									<HistoryIcon dimensions='h-7 w-7' />
									<p className='text-base'>Read history</p>
								</div>
							</Link>
						</div>
					) : (
						<></>
					)}
				</div>

				<Link href='/'>
					<div className={routeClassHandler('/user/uploads') + 'my-4'}>
						<PlusCircleIcon dimensions='h-7 w-7' />
						<p className='text-base'>Uploads</p>
					</div>
				</Link>

				<Link href='/'>
					<div className={routeClassHandler('/account') + 'my-4'}>
						<AccountIcon dimensions='h-7 w-7' />
						<p className='text-base'>Account</p>
					</div>
				</Link>

				<Link href='/'>
					<div className={routeClassHandler('/account/settings') + 'my-4'}>
						<SettingsIcon dimensions='h-7 w-7' />
						<p className='text-base'>Settings</p>
					</div>
				</Link>

				<hr className='border-t-[0.1px] border-gray-800 w-full' />
				<div className='absolute bottom-16 w-full'>
					<Link href='/'>
						<div className={routeClassHandler('/faq')}>
							<HelpIcon dimensions='h-7 w-7' />
							<p className='text-base'>Help</p>
						</div>
					</Link>
				</div>
				<div className='absolute bottom-4 w-full'>
					<Link href='/'>
						<div className={routeClassHandler('/support')}>
							<FeedbackIcon dimensions='h-7 w-7' />
							<p className='text-base'>Feedback</p>
						</div>
					</Link>
				</div>
				{/* {collections.map((collection) => (
							<p
								key={collection.id}
								onClick={setcollectionId(collection.id)}
								className='cursor-pointer hover:text-white'>
								{collection.name} className='text-base'
							</p>
						))} */}
			</div>
		)
	)
}

export default Sidebar
