import type { CertificateAuthorityOptions } from 'mkcert'
import { createCA } from 'mkcert'
import { allowCors } from '../../src/utils/cors'

export const GET = (req, res) => {

  console.log(req.url)
  console.log(res)

  return Response.json({
    message: 'This is a GET request',
    description: 'Please send a POST request to create a certificate authority'
  })
}

const PostHndler = async (req, _) => {

  const { organization, countryCode, state, locality, validity = 365 }: CertificateAuthorityOptions = await req.json()


  if (!organization || !countryCode || !state || !locality || !validity) {
    return Response.json({
      message: 'Missing required fields',
      description: 'Please provide all required fields'
    }, {
      status: 400
    })
  }

  try {
    const certificate = await createCA({
      organization,
      countryCode,
      state,
      locality,
      validity
    })
    return Response.json({ certificate }, {
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error: unknown) {
    console.error(error)
    return Response.json({
      message: 'An unexpected error occurred',
      description: 'Please try again later',
    }, {
      status: 400
    })
  }
}

export const POST = allowCors(PostHndler)
