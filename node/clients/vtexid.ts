import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class VtexID extends ExternalClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('http://vtexid.vtex.com.br/api/vtexid', ctx, opts)
  }

  public getIdUser = (token: string) => {
    // VTEX ID requires the account name (`an`) for cross-account checks
    // alongside the auth token. The account is sourced from the IO context
    // so it always matches the tenant the request is being served for.
    const account = encodeURIComponent(this.context.account)

    return this.http.get(
      `pub/authenticated/user?authToken=${token}&an=${account}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: this.context.authToken,
          'Content-Type': 'application/json',
          'User-Agent': process.env.VTEX_APP_ID!,
          'X-VTEX-Proxy-To': 'https://vtexid.vtex.com.br',
        },
      }
    )
  }
}
