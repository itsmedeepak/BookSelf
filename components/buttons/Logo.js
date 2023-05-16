import Image from 'next/image'

function Logo({ size }) {
	return (
		<div className='flex gap-[.1rem] py-1 xl:p-1.5'>
			{/* <img src='/images/logo.png' alt='Logo' className='w-10 h-10' /> */}
			<Image src='/images/logo.png' alt='BookSelf' className='inline xl:p-[.1rem]' width={size} height={size} />
			<div className='flex flex-col items-center justify-center'>
				<h1 className='font-merriweather text-xl xl:text-2xl inline text-white px-1 font-medium'>BookSelf</h1>
			</div>
		</div>
	)
}
export default Logo
