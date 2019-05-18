import { filter, pluck } from 'ramda'

import { Query } from '../../typedql/schema'

const TARGET_APP_NAME = 'vtex.graphql-server'
const TARGET_APP_MAJOR = '1'

export const apps = async (_: any, __: any, ctx: Context ): Promise<Query['apps']> => {
  const { clients: { apps: appsClient } } = ctx

  const metaInfos = await appsClient.getAppsMetaInfos()

  const graphqlAppsMetaInfos = filter(
    ({_resolvedDependencies}) => {
      const graphqlServerVersion = _resolvedDependencies[TARGET_APP_NAME]
      if (graphqlServerVersion) {
        const [major] = graphqlServerVersion.split('.')
        return major === TARGET_APP_MAJOR
      }
      return false
    },
    metaInfos
  )

  return pluck('id', graphqlAppsMetaInfos)
}