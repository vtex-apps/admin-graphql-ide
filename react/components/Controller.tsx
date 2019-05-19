import GraphiQL from 'graphiql'
import { buildClientSchema, GraphQLSchema, introspectionQuery, IntrospectionQuery } from 'graphql'
import { path } from 'ramda'
import React, { Fragment, FunctionComponent } from 'react'
import { Button, EmptyState, EXPERIMENTAL_Select, Spinner } from 'vtex.styleguide'

import { getOrCreateScopedStorage } from '../utils/storage'

type Fetcher = (params: any) => Promise<string>

interface State {
  error: boolean
  chosenAppId?: string
  schema?: GraphQLSchema
  fetcher?: Fetcher
}

interface Props {
  apps: string[]
}

const fetcherForApp = (appId: string) => (params: any) => fetch(`/_v/private/admin-graphiql/v0/${appId}`, {
  body: JSON.stringify(params),
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
}).then(response => response.json())

const Error: FunctionComponent<{fetchSchema: Fetcher}> = ({fetchSchema}) => (
  <EmptyState title="Something bad happened">
    <div className="pt5">
      <Button variation="secondary" size="small" onClick={fetchSchema}>
        <span className="flex align-baseline">Try again</span>
      </Button>
    </div>
  </EmptyState>
)

export class GraphiQLController extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      chosenAppId: undefined,
      error: false,
      fetcher: undefined,
      schema: undefined,
    }
  }

  public render = () => (
    <Fragment>
      <div className="mb5">
        <EXPERIMENTAL_Select
          label="Choose your app from the list below"
          options={this.props.apps.map(app => ({value: app, label: app}))}
          multi={false}
          onChange={(chosen: {value?: string} | null) => this.setState(
            (oldState) => {
              const chosenAppId = chosen ? chosen.value : undefined
              return {
                ...oldState,
                chosenAppId,
                fetcher: chosenAppId ? fetcherForApp(chosenAppId) : undefined,
                schema: undefined,
              }
            }, 
            () => this.state.fetcher && this.fetchSchema(this.state.fetcher)
          )}
        />
      </div>
      {
        this.state.error 
        ? (
          <Error fetchSchema={this.state.fetcher}/>
        ) : this.state.chosenAppId && this.state.schema
        ? (
          <GraphiQL 
            fetcher={this.state.fetcher} 
            storage={getOrCreateScopedStorage(this.state.chosenAppId)}
            schema={this.state.schema}
          />
        ) : this.state.chosenAppId
        ? (
          <Spinner />
        ) : (
          <EmptyState title="Choose an App">
            <p>
              Please choose an App to start making queries to
            </p>
          </EmptyState>
        )
      }
    </Fragment>
  )

  private fetchSchema = async (fetcher: Fetcher) => {
    const response = await fetcher({query: introspectionQuery})
    const schema = path(['data'], response) as IntrospectionQuery | undefined
    this.setState({
      schema: schema && buildClientSchema(schema),
    })
  }
}
