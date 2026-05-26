import { ForbiddenError } from '@vtex/api'
import bodyParser from 'co-body'
import { path, pick } from 'ramda'

import type { Clients } from '../clients'

const ADMIN_AUDIENCE = 'admin'
const STOREFRONT_COOKIE_PREFIX = 'VtexIdclientAutCookie_'

const getAuthToken = (ctx: Context): string | undefined => {
  const headerToken = ctx.request.headers.vtexidclientautcookie

  if (typeof headerToken === 'string' && headerToken.length > 0) {
    return headerToken
  }

  if (Array.isArray(headerToken) && headerToken[0]) {
    return headerToken[0]
  }

  return ctx.cookies.get('VtexIdclientAutCookie') || undefined
}

const stripStorefrontCookies = (cookieHeader: string | undefined) => {
  if (!cookieHeader) {
    return cookieHeader
  }

  return cookieHeader
    .split(';')
    .map((c) => c.trim())
    .filter((c) => c && !c.startsWith(STOREFRONT_COOKIE_PREFIX))
    .join('; ')
}

export const ensureAdminUser = async (
  clients: Pick<Clients, 'sphinx' | 'vtexID'>,
  idToken: string | undefined
) => {
  const { sphinx, vtexID } = clients

  if (!idToken) {
    throw new ForbiddenError('No VtexIdclientAutCookie provided')
  }

  let credential: Awaited<ReturnType<typeof vtexID.validateToken>>

  try {
    credential = await vtexID.validateToken(idToken)
  } catch (err) {
    throw new ForbiddenError(
      `Invalid VtexIdclientAutCookie: ${err?.message ?? err}`
    )
  }

  if (!credential) {
    throw new ForbiddenError('Invalid VtexIdclientAutCookie')
  }

  if (credential.audience && credential.audience !== ADMIN_AUDIENCE) {
    throw new ForbiddenError(
      'admin-graphql-ide is restricted to admin-audience tokens'
    )
  }

  const email = credential.user

  if (!email) {
    throw new ForbiddenError(
      'User must have a valid email to use admin-graphql-ide'
    )
  }

  const isAdminUser = await sphinx.isAdmin(email)

  if (!isAdminUser) {
    throw new ForbiddenError('User must be admin to use admin-graphql-ide')
  }
}

export async function graphqlProxy(ctx: Context) {
  const {
    clients: { graphqlServer },
    vtex: {
      route: {
        params: { appId: paramAppId },
      },
    },
  } = ctx

  const idToken = getAuthToken(ctx)

  await ensureAdminUser(ctx.clients, idToken)

  const body = await bodyParser(ctx.req)

  const appId = paramAppId as string

  const headersToSend = [
    'accept',
    'accept-language',
    'authorization',
    'content-length',
    'content-type',
    'cookie',
    'rest-range',
    'user-agent',
    'vtexidclientautcookie',
    'x-forwarded-host',
  ]

  const headers = pick(headersToSend, ctx.request.headers) as Record<
    string,
    string | string[] | undefined
  >

  if (typeof headers.cookie === 'string') {
    headers.cookie = stripStorefrontCookies(headers.cookie)
  }

  ctx.body = await graphqlServer
    .proxyGraphiQL(body, appId, headers)
    .catch(path(['response', 'data']))
  ctx.status = 200
}
