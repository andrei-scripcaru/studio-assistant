import { NextApiRequest, NextApiResponse } from 'next'

import auth0 from '../../lib/auth0'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    await auth0.handleProfile(req, res)
  } catch (error) {
    console.error(error)

    res.status(error.status || 500).end(error.message)
  }
}
