import { ForbiddenError } from '@vtex/api'
import bodyParser from 'co-body'
import { path, pick } from 'ramda'

import type { Clients } from '../clients'

const EMPTY_OBJECT = {}

export const ensureAdminUser = async (
  clients: Pick<Clients, 'sphinx' | 'vtexID'>,
  idToken: string | undefined
) => {
  const { sphinx, vtexID } = clients

  if (!idToken) {
    throw new ForbiddenError('No VtexIdclientAutCookie provided')
  }

  const { user: email } =
    (await vtexID.getIdUser(idToken)) || (EMPTY_OBJECT as any)

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

  const idToken = ctx.cookies.get('VtexIdclientAutCookie')

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

  const headers = pick(headersToSend, ctx.request.headers)

  ctx.body = await graphqlServer
    .proxyGraphiQL(body, appId, headers)
    .catch(path(['response', 'data']))
  ctx.status = 200
}
