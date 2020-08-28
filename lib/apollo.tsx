import type { NextPage } from 'next'

import Head from 'next/head'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'

import { SubscriptionClient } from 'subscriptions-transport-ws'

import fetch from 'isomorphic-unfetch'

import auth0 from './auth0'

let accessToken = null
let globalApolloClient = null

onError(({ networkError }: any) => {
  if (
    networkError &&
    networkError.name === 'ServerError' &&
    networkError.statusCode === 401
  ) {
    accessToken = null // remove cached token on 401 from the server
  }
})

const createHttpLink = (headers): HttpLink => {
  return new HttpLink({
    uri: 'https://loving-crappie-74.hasura.app/v1/graphql',
    credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
  })
}

const createWSLink = (): WebSocketLink => {
  return new WebSocketLink(
    new SubscriptionClient('wss://loving-crappie-74.hasura.app/v1/graphql', {
      lazy: true,
      reconnect: true,

      async connectionParams() {
        if (!accessToken) {
          const res = await fetch('/api/session')

          if (res.ok) {
            const json = await res.json()

            accessToken = json.accessToken
          } else {
            accessToken = 'public'
          }
        }

        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      },
    })
  )
}

const createApolloClient = (
  initialState = null,
  headers = null
): ApolloClient<any> => {
  const ssrMode = typeof window === 'undefined'

  let link

  if (ssrMode) {
    link = createHttpLink(headers) // executed on server
  } else {
    link = createWSLink() // executed on client
  }

  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}

const getHeaders = async ({ req, res }) => {
  if (typeof window !== 'undefined') return null
  if (typeof req === 'undefined') return null

  const session = await auth0.getSession(req)

  if (!session) {
    res.writeHead(302, {
      Location: '/api/login',
    })

    return res.end()
  } else if (!session.accessToken) return null

  return {
    authorization: `Bearer ${session ? session.accessToken : ''}`,
  }
}

const initApolloClient = (initialState, headers) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, headers)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers)
  }

  return globalApolloClient
}

/**
 * Creates a `withApollo` HOC
 * that provides the `apolloContext`
 * to a Next.js `Page` or `AppTree`.
 */
export const withApollo = ({ ssr = true } = {}) => (
  PageComponent: NextPage
): React.ReactNode => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client

    if (apolloClient) {
      // Happens on: `getDataFromTree` & Next.js SSR
      client = apolloClient
    } else {
      // Happens on: Next.js CSR
      // client = initApolloClient(apolloState, undefined);
      client = initApolloClient(apolloState, {})
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct `displayName` in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx

      // Initialize `ApolloClient`, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        null,
        await getHeaders(ctx)
      ))

      // Run wrapped `getInitialProps` methods
      let pageProps = {}

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if SSR is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/client/react/ssr')

            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // `getDataFromTree` does not call `componentWillUnmount`
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,

        apolloState,
      }
    }
  }

  return WithApollo
}
