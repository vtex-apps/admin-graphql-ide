import React, { FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'

import { GraphiQLController } from './components/Controller'
import { GetApps } from './graphql/getApps'

const Index: FunctionComponent = () => (
  <div className="vh-100 flex flex-column flex-grow-1">
    <NoSSR>
      <Helmet>
        <link href="//cdn.jsdelivr.net/npm/graphiql@0.11.11/graphiql.css" rel="stylesheet" />
      </Helmet>
      <GetApps>
        {({apps}) => <GraphiQLController apps={apps} />}
      </GetApps>
    </NoSSR>
  </div>
)

export default Index