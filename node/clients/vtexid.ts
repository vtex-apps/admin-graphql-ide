import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export interface VtexIdCredential {
  user?: string
  userId?: string
  audience?: string
  account?: string
}

export class VtexID extends ExternalClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('https://vtexid.vtex.com.br/api/vtexid', ctx, opts)
  }

  public validateToken = (token: string): Promise<VtexIdCredential> => {
    const account = encodeURIComponent(this.context.account)

    return this.http.post(
      `/credential/validate?an=${account}`,
      { token },
      {
        headers: {
          Accept: 'application/json',
          Authorization: this.context.authToken,
          'Content-Type': 'application/json',
          'User-Agent': process.env.VTEX_APP_ID!,
        },
      }
    )
  }
}
