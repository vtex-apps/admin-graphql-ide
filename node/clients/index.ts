import { IOClients, Sphinx } from '@vtex/api'

import { GraphQLServer } from './graphqlServer'
import { VtexID } from './vtexid'

export class Clients extends IOClients {
  public get graphqlServer() {
    return this.getOrSet('graphqlServer', GraphQLServer)
  }

  public get sphinx() {
    return this.getOrSet('sphinx', Sphinx)
  }

  public get vtexID() {
    return this.getOrSet('vtexID', VtexID)
  }
}
