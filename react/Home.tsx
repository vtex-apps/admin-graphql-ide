import GraphiQL from 'graphiql'
import React, { FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'
import { Dropdown } from 'vtex.styleguide'
// import { Apps } from '@vtex/api'

function graphQLFetcher(graphQLParams: any) {
  return fetch('/_v/private/graphql/v1', {
    body: JSON.stringify(graphQLParams),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
  }).then(response => response.json())
}

const Home: FunctionComponent = () => (
  <div className="vh-100 flex flex-grow-1">
    <div className="mb5">
      <Dropdown
        label="Dropdown Example - Regular size" // optional line: size="small" or "large"
        options= //await ctx.apps.getDependencies()
          {[
            { value: 'chagall', label: 'Chagall' },
            { value: 'dali', label: 'Dali' },
            { value: 'goya', label: 'Goya' },
            { value: 'monet', label: 'Monet' },
            { value: 'picasso', label: 'Picasso' },
            { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
          ]}
        value="tolouseLautrec"
        onChange={() => {}}
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