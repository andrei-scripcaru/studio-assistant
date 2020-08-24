import { withApollo } from '../lib/apollo'

import Todos from '../components/Todos'

const Home = (): JSX.Element => {
  return <Todos />
}

export default withApollo()(Home)
