import Head from 'next/head'

import { Box, Grid } from '@chakra-ui/core'

import Header from './Header'
import Navigation from './Navigation'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        templateAreas="'header header' 'navigation main'"
        templateRows="auto 1fr"
        templateColumns="auto 1fr"
        w="100vw"
        h="100vh"
      >
        <Header />
        <Navigation />

        <Box as="main" gridArea="main">
          {children}
        </Box>
      </Grid>
    </div>
  )
}

export default Layout
