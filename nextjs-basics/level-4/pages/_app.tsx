import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeContext'
import { FavoritesProvider } from '../context/FavoriteContext'
import Layout from '../components/Layout'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Layout>
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default MyApp