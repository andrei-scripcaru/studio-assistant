import Head from 'next/head'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </div>
  )
}

export default Layout
