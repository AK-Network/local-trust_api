import type { CertificateOptions } from "mkcert"
import { createCert } from "mkcert"


export const OPTIONS = () => {
  return new Response(null, { status: 200 })
}

export const POST = async (req, res) => {
  const {ca, domains, validity = 365}: CertificateOptions = await req.json()

  if (!ca || !domains) {
    return Response.json({
      message: 'Missing required fields',
      description: 'Please provide all required fields'
    }, {
      status: 400
    })
  }

  const certificate = await createCert({
    ca,
    domains,
    validity
  })
  return Response.json({ certificate })
}
