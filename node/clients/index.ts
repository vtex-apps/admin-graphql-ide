import { IOClients } from '@vtex/api'

import { GraphQLServer } from './graphqlServer'
import { Sphinx } from './sphinx'
import { VtexID } from './vtexid'

export class Clients extends IOClients {
  get graphqlServer () {
    return this.getOrSet('graphqlServer', GraphQLServer)
  }

  get sphinx () {
    return this.getOrSet('sphinx', Sphinx)
  }

  get vtexID () {
    return this.getOrSet('vtexID', VtexID)
  }
}