import { useState, useEffect, useContext, Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import UserContext from '../../../store/userContext'
import SnackbarContext from '../../../store/snackbarContext'
import LoginBanner from '../../../components/login/LoginBanner'
import PageHeader from '../../../components/layouts/PageHeader'
import ReportIcon from '../../../assets/icons/ReportIcon'

function SettingsPage() {
	const userCtx = useContext(UserContext)
	const snackbarCtx = useContext(SnackbarContext)
	const router = useRouter()

	const [title, setTitle] = useState('')
	const [activeUser, setActiveUser] = useState(null)
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		setActiveUser(userCtx.user)
		if (!title) setTitle(router.asPath.split('.')[1]?.split('/report')[0]?.split('-').join(' '))
	}, [activeUser])

	const reportSubmitHandler = (e) => {
		e.preventDefault()
		router.back()
		snackbarCtx.addMessage({ title: 'Report submitted successfully.', status: 'success' })
	}

	const selectInputHandler = (e) => {
		setSelected(e.target.value)
	}

	return (
		<Fragment>
			<Head>
				<title>Report book</title>
				<meta name='description' content='Report book section' />
			</Head>

			{!activeUser?.data ? (
				<LoginBanner title='Report book' message='Please login to report this book' icon={<ReportIcon />} />
			) : (
				<div className='page-gradient p-2 pb-16 xl:p-8 xl:pb-8'>
					<PageHeader pageTitle='Report Book' backBtn={true} />
					<div className='p-2 xl:p-4'>
						<p className='text-xl font-bold py-2 xl:py-4'>Book: {title}</p>
						<p className='text-xl font-bold py-2 xl:py-4'>What do you want to report?</p>
					</div>
					<div className='flex flex-col justify-start p-2 xl:p-4 gap-6 xl:gap-8 w-full sm:w-1/2 lg:w-1/3'>
						<div className='flex justify-between w-full gap-8 xl:gap-12'>
							<div className='flex flex-col justify-start items-start'>
								<p className='text-lg font-medium'>Copyright Issue</p>
								<p className='text-md text-gray-300'>
									Using someone else's copyrighted work without having permission
								</p>
							</div>
							<div className='flex justify-end items-center w-1/6'>
								<input
									type='checkbox'
									value='copyright'
									checked={selected === 'copyright' ? true : false}
									onClick={selectInputHandler}
									className='h-4 w-4 rounded-full border-gray-300 text-indigo-600'
								/>
							</div>
						</div>
						<div className='flex justify-between w-full gap-8 xl:gap-12'>
							<div className='flex flex-col justify-start items-start'>
								<p className='text-lg font-medium'>Missing information</p>
								<p className='text-md text-gray-300'>
									Having incomplete or missing details of the book
								</p>
							</div>
							<div className='flex justify-end items-center w-1/6'>
								<input
									type='checkbox'
									value='missing'
									checked={selected === 'missing' ? true : false}
									onClick={selectInputHandler}
									className='h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600'
								/>
							</div>
						</div>
						<div className='flex justify-between w-full gap-8 xl:gap-12'>
							<div className='flex flex-col justify-start items-start'>
								<p className='text-lg font-medium'>Incorrect Details</p>
								<p className='text-md text-gray-300'>Using incorrect or wrong details of the book</p>
							</div>
							<div className='flex justify-end items-center w-1/6'>
								<input
									type='checkbox'
									value='incorrect'
									checked={selected === 'incorrect' ? true : false}
									onClick={selectInputHandler}
									className='h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600'
								/>
							</div>
						</div>
						<div className='flex justify-between w-full gap-8 xl:gap-12'>
							<div className='flex flex-col justify-start items-start'>
								<p className='text-lg font-medium'>Hateful or abusive content</p>
								<p className='text-md text-gray-300'>
									The book contains any hateful, degrading or inflammatory content
								</p>
							</div>
							<div className='flex justify-end items-center w-1/6'>
								<input
									type='checkbox'
									value='abusive'
									checked={selected === 'abusive' ? true : false}
									onClick={selectInputHandler}
									className='h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600'
								/>
							</div>
						</div>
						<div className='flex justify-between w-full gap-8 xl:gap-12'>
							<div className='flex flex-col justify-start items-start'>
								<p className='text-lg font-medium'>Spam or misleading</p>
								<p className='text-md text-gray-300'>
									Sharing irrevelent or repetitive content or using misleading content as if it were
									factual
								</p>
							</div>
							<div className='flex justify-end items-center w-1/6'>
								<input
									type='checkbox'
									value='spam'
									checked={selected === 'spam' ? true : false}
									onClick={selectInputHandler}
									className='h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600'
								/>
							</div>
						</div>
						<div className='flex justify-center py-6'>
							<button className='login-btn' onClick={reportSubmitHandler}>
								<span>Report</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default SettingsPage

// className='rounded-full-3xl h-[1.15rem] w-[1.15rem]'
