import type { CertificateOptions } from "mkcert"
import { createCert } from "mkcert"
import { allowCors } from "../../src/utils/cors"

export const GET = () => {
  return Response.json({
    message: 'This is a GET request',
    description: 'Please send a POST request to create a certificate'
  })
}

const PostHandler = async (req, res) => {
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
  return res.json({ certificate })
}

export const POST = PostHandler
