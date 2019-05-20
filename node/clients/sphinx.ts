import { InfraClient, InstanceOptions, IOContext } from '@vtex/api'

export class Sphinx extends InfraClient {

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('sphinx', ctx, opts)
  }

  public isAdmin = (email: string): Promise<boolean> => {
    return this.http.get<boolean>(
      `/user/${email}/isAdmin`, {
      metric: 'sphinx-is-admin',
    })
  }
}
