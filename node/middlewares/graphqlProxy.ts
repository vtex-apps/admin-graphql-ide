import bodyParser from 'co-body'
import { path } from 'ramda'

// const ensureAdminUser = ()

export const graphqlProxy = async (ctx: Context) => {
  const {
    clients: { graphqlServer },
    vtex: {
      route: {
        params: { appId: paramAppId },
      },
    },
  } = ctx
  const appId = paramAppId as string
  const body = await bodyParser(ctx.req)
  ctx.body = await graphqlServer.proxyGraphiQL(body, appId).catch(path(['response', 'data']))
  ctx.status = 200
}