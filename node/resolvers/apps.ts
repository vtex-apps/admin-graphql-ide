import type { AppMetaInfo, Apps } from '@vtex/api'
import { filter as filterP } from 'bluebird'
import { filter, pluck } from 'ramda'

import type { Query } from '../../typedql/schema'

const TARGET_APP_NAME = 'vtex.graphql-server'
const TARGET_APP_MAJOR = '1'
const SCHEMA_GRAPHQL = 'public/schema.graphql'

const filterGraphQLApps = (metaInfos: AppMetaInfo[]) =>
  filter(({ _resolvedDependencies }) => {
    const graphqlServerVersion = _resolvedDependencies[TARGET_APP_NAME]

    if (graphqlServerVersion) {
      const [major] = graphqlServerVersion.split('.')

      return major === TARGET_APP_MAJOR
    }

    return false
  }, metaInfos)

const filterAppWithSchema = (appsClient: Apps, metaInfos: AppMetaInfo[]) =>
  filterP(metaInfos, async ({ id }) => {
    try {
      const schema = await appsClient.getAppFile(id, SCHEMA_GRAPHQL)

      return !!schema
    } catch (_) {
      return false
    }
  })

export const apps = async (
  _: any,
  __: any,
  ctx: Context
): Promise<Query['apps']> => {
  const {
    clients: { apps: appsClient },
  } = ctx

  const metaInfos = await appsClient.getAppsMetaInfos()

  const graphqlApps = filterGraphQLApps(metaInfos)
  const appsWithSchema = await filterAppWithSchema(appsClient, graphqlApps)

  return pluck('id', appsWithSchema)
}
