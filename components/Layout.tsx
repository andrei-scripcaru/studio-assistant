import Head from 'next/head'

import { Grid, Box } from '@chakra-ui/core'

import Header from './Header'
import Navigation from './Navigation'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Studio Assistant</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        templateAreas="'header header' 'navigation main'"
        templateRows="auto 1fr"
        templateColumns="auto 1fr"
        width="100vw"
        height="100vh"
      >
        <Header />
        <Navigation />

        <Box
          as="main"
          gridArea="main"
          overflow="hidden"
          marginTop={4}
          marginLeft="-1px"
          borderLeft="1px solid"
          borderLeftColor="gray.200"
        >
          {children}
        </Box>
      </Grid>
    </>
  )
}

export default Layout
