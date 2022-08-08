import type { InstanceOptions, IOContext } from '@vtex/api'
import { AppClient } from '@vtex/api'

export class GraphQLServer extends AppClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.graphql-server@1.x', ctx, opts)
  }

  public proxyGraphiQL = (
    body: any,
    appId: string,
    headers: Record<string, string | string[] | undefined>
  ) =>
    this.http.post('/graphiql', body, {
      headers: {
        ...headers,
        'x-colossus-declarer-id': appId,
      },
    })
}
