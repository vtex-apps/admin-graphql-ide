import { ForbiddenError } from '@vtex/api'
import bodyParser from 'co-body'
import { path } from 'ramda'

import { Clients } from '../clients'

const EMPTY_OBJECT = {}

export const ensureAdminUser = async (clients: Pick<Clients, 'sphinx' | 'vtexID'>, idToken: string) => {
  const { sphinx, vtexID } = clients

  if (!idToken) {
    throw new ForbiddenError('No VtexIdclientAutCookie provided')
  }

  const {user: email} = (await vtexID.getIdUser(idToken)) || EMPTY_OBJECT as any
  if (!email) {
    throw new ForbiddenError('User must have a valid email to use admin-graphiql')
  }

  const isAdminUser = await sphinx.isAdmin(email)
  if (!isAdminUser) {
    throw new ForbiddenError('User must be admin to use admin-graphiql')
  }
}


export const graphqlProxy = async (ctx: Context) => {
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
  ctx.body = await graphqlServer.proxyGraphiQL(body, appId).catch(path(['response', 'data']))
  ctx.status = 200
}