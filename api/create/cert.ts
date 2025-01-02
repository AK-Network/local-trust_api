import type { CertificateOptions } from "mkcert"
import { createCert } from "mkcert"

export const GET = () => {
  return Response.json({
    message: 'This is a GET request',
    description: 'Please send a POST request to create a certificate'
  })
}

export const POST = async (req, res) => {
  const {ca, domains, validity = 365, organization, email}: CertificateOptions = await req.json()

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
    validity,
    organization,
    email
  })
  return Response.json({ certificate }, {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    }
  })
}