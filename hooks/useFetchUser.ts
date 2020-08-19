import { useState, useEffect } from 'react'

declare global {
  interface Window {
    __user?: JSON | null
  }
}

export const fetchUser = async (
  cookie = ''
): Promise<Window['__user'] | null> => {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user
  }

  const res = await fetch(
    '/api/me',
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  )

  if (!res.ok) {
    delete window.__user

    return null
  }

  const json = await res.json()

  if (typeof window !== 'undefined') {
    window.__user = json
  }

  return json
}

export default ({ required = true } = {}): {
  user: Window['__user']
  loading: boolean
} => {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  )

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return window.__user || null
  })

  useEffect(() => {
    if (!loading && user) {
      return
    }

    setLoading(true)

    let isMounted = true

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !user) {
          window.location.href = '/api/login'

          return
        }

        setUser(user)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return { user, loading }
}