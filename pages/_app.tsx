import type { AppProps } from 'next/app'

import { ChakraProvider, CSSReset } from '@chakra-ui/core'

import theme from '@chakra-ui/theme'

import 'focus-visible'

import Layout from '../components/Layout'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
