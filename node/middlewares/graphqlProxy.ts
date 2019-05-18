import bodyParser from 'co-body'

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
  ctx.body = await graphqlServer.proxyGraphiQL(body, appId)
}