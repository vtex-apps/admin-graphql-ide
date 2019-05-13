import GraphiQL from 'graphiql'
import React, { FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'

function graphQLFetcher(graphQLParams: any) {
  return fetch('/_v/private/graphql', { // window.location.origin + '/graphql'              /_v/segment/graphql
    body: JSON.stringify(graphQLParams),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
  }).then(response => response.json())
}

const Home: FunctionComponent = () => (
  <div className="vh-100 flex flex-grow-1">
    <Helmet>
      <link href="//cdn.jsdelivr.net/npm/graphiql@0.11.11/graphiql.css" rel="stylesheet" />
    </Helmet>
    <NoSSR>
      <GraphiQL fetcher={graphQLFetcher} />
    </NoSSR>
  </div>
)

export default Home
