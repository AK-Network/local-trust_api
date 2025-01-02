import type { CertificateAuthorityOptions } from 'mkcert'
import { createCA } from 'mkcert'


export const OPTIONS = () => {
  return new Response(null, { status: 200 })
}

export const POST = async (req, ctx) => {

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
    return Response.json({ certificate })
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
