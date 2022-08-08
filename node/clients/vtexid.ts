import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class VtexID extends ExternalClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('http://vtexid.vtex.com.br/api/vtexid', ctx, opts)
  }

  public getIdUser = (token: string) =>
    this.http.get(`pub/authenticated/user?authToken=${token}`, {
      headers: {
        Accept: 'application/json',
        Authorization: this.context.authToken,
        'Content-Type': 'application/json',
        'User-Agent': process.env.VTEX_APP_ID!,
        'X-VTEX-Proxy-To': 'https://vtexid.vtex.com.br',
      },
    })
}
