import type { AppProps } from 'next/app'

import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import Layout from '../components/Layout'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
