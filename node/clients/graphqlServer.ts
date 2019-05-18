import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export class GraphQLServer extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.graphql-server', ctx, opts)
  }

  public proxyGraphiQL = (body: any, appId: string) => this.http.post('/graphiql', body, {
    headers: {
      'x-colossus-declarer-id': appId,
    },
  })
}