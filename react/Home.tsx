// import AppPicker from './components/appPicker';
import GraphiQL from 'graphiql'
import React, { FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'
// import { Apps } from '@vtex/api'

import { Controllers } from './typings/global'

function graphQLFetcher(graphQLParams: any) {
  return fetch('/_v/private/graphql/v1', {
    body: JSON.stringify(graphQLParams),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
  }).then(response => response.json())
}

interface Props {
  controllers: Controllers
  setControllers: any
}

const Home: FunctionComponent = () => (
  <div className="vh-100 flex flex-grow-1">
    {/* <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} /> */}
    {/* <AppPicker controllers={undefined} setControllers={undefined} /> */}
    <div className="mb5">
      <EXPERIMENTAL_Select
        label="Choose your app from the list below"
        options={[ // await ctx.apps.getDependencies()
            { value: 'app1', label: 'App 1' },
            { value: 'app2', label: 'App 2' },
            { value: 'app3', label: 'App 3' },
            { value: 'app4', label: 'App 4' },
            { value: 'app5', label: 'App 5' },
            { value: 'app6', label: 'App 6' },
          ]}
        multi={false}
        onChange={values => {
          console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
        }}
      />
    </div>
    <Helmet>
      <link href="//cdn.jsdelivr.net/npm/graphiql@0.11.11/graphiql.css" rel="stylesheet" />
    </Helmet>
    <NoSSR>
      <GraphiQL fetcher={graphQLFetcher} />
    </NoSSR>
  </div>
)

export default Home