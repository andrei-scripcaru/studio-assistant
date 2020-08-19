import type { NextPage } from 'next'

import { withApollo } from '../lib/apollo'

import Todos from '../components/Todos'

const Home: NextPage = () => {
  return <Todos />
}

export default withApollo({ ssr: true })(Home)
