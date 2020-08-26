import type { AppProps } from 'next/app'

import { ChakraProvider, CSSReset, Box } from '@chakra-ui/core'

import theme from '@chakra-ui/theme'

import 'focus-visible'

import { motion, AnimatePresence } from 'framer-motion'

import Layout from '../components/Layout'

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const MotionBox = motion.custom(Box)

  const motionVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  }

  const motionProps = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    variants: motionVariants,
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <Layout>
        <AnimatePresence exitBeforeEnter>
          <MotionBox {...motionProps} key={router.route} height="full">
            <Component {...pageProps} />
          </MotionBox>
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}

export default App
