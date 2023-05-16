import Head from 'next/head'

import { UserContextProvider } from '../store/userContext'
import { SnackbarContextProvider } from '../store/snackbarContext'
import { SearchToggleContextProvider } from '../store/searchToggleContext'
import { BookContextProvider } from '../store/bookContext'
import Container from '../components/layouts/Container'
import '../assets/globals.css'
import '../assets/scrollbar.css'

function App({ Component, pageProps }) {
	return (
		<UserContextProvider>
			<SnackbarContextProvider>
				<SearchToggleContextProvider>
					<BookContextProvider>
						<Container>
							<Head>
								<meta
									name='viewport'
									content='width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no'
								/>
								<meta name='apple-mobile-web-app-title' content='BookHive' />
								<meta name='mobile-web-app-capable' content='yes' />
								<meta name='apple-mobile-web-app-capable' content='yes' />
								<link rel='icon' type='image/png' sizes='32x32' href='/images/logo.png' />
								<link rel='apple-touch-icon' href='/images/logo.png' />
								<link rel='shortcut icon' type='image/png' sizes='192x192' href='/images/logo.png' />
							</Head>
							<Component {...pageProps} />
						</Container>
					</BookContextProvider>
				</SearchToggleContextProvider>
			</SnackbarContextProvider>
		</UserContextProvider>
	)
}

export default App
