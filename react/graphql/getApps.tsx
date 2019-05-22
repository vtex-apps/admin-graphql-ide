import React, { FunctionComponent } from 'react'
import { Query as QueryComponent } from 'react-apollo'

import { Query } from '../../typedql/schema'
import getAppsQuery from './apps.graphql'

type Data = Pick<Query, 'apps'>

interface Props {
  children: (data: any) => React.ReactNode
}

export const GetApps: FunctionComponent<Props> = ({children}) => (
 <QueryComponent<Data> query={getAppsQuery}>
    {({data, loading}) => {
      if (loading) {
        return null
      }
      return children!(data)
    }}
  </QueryComponent>
)