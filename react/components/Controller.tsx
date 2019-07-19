import GraphiQL from 'graphiql'
import { buildClientSchema, GraphQLSchema, IntrospectionQuery, introspectionQuery } from 'graphql'
import { path } from 'ramda'
import React, { Fragment } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { EXPERIMENTAL_Select, Spinner } from 'vtex.styleguide'

import { getOrCreateScopedStorage } from '../utils/storage'
import { ErrorState } from './ErrorState'
import { NoAppSelected } from './NoAppSelected'

type Fetcher = (params: any) => Promise<string>

enum ViewState {
  ON_ERROR = 'error',
  ON_SELECT_APP = 'select',
  ON_GRAPHIQL = 'graphiql',
  ON_FETCHING_SCHEMA = 'fetch',
}

interface State {
  error: boolean
  chosenAppId: string | undefined
  schema: GraphQLSchema | undefined
  fetcher: Fetcher | undefined
  mode: ViewState
}

interface Props extends InjectedIntlProps {
  apps: string[]
}

const fetcherForApp = (appId: string) => (params: any) => fetch(`/_v/private/admin-graphql-ide/v0/${appId}`, {
  body: JSON.stringify(params),
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
}).then(response => response.json())

const messages = defineMessages({
  appChooser: {
    id: 'admin/controller.app-picker',
    defaultMessage: "Choose your app from the list below"
  }
})

class GraphiQLControllerComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      chosenAppId: undefined,
      error: false,
      fetcher: undefined,
      schema: undefined,
      mode: ViewState.ON_SELECT_APP
    }
  }

  public setState = (state: any, cb?: () => void) => {
    const { schema, chosenAppId, error, fetcher }: any = typeof state === 'function' ? state(this.state) : { ...this.state, ...state }
    let mode: ViewState
    if (error) {
      mode = ViewState.ON_ERROR
    } else if (!schema && fetcher && chosenAppId) {
      mode = ViewState.ON_FETCHING_SCHEMA
    } else if (schema && chosenAppId) {
      mode = ViewState.ON_GRAPHIQL
    } else {
      mode = ViewState.ON_SELECT_APP
    }

    super.setState({
      schema,
      chosenAppId,
      error,
      fetcher,
      mode,
    }, () => {
      if (mode === ViewState.ON_FETCHING_SCHEMA) {
        this.fetchSchema()
      }
      if (cb) {
        cb()
      }
    })
  }

  public render = () => (
    <Fragment>
      <div className="mb5 z-max">
        <EXPERIMENTAL_Select
          label={this.props.intl.formatMessage(messages.appChooser)}
          options={this.props.apps.map(app => ({ value: app, label: app }))}
          multi={false}
          onChange={(chosen: { value?: string } | null) => this.setState(
            (oldState: State) => {
              const chosenAppId = chosen ? chosen.value : undefined
              return {
                ...oldState,
                chosenAppId,
                fetcher: chosenAppId ? fetcherForApp(chosenAppId) : undefined,
                schema: undefined,
              }
            }
          )}
        />
      </div>
      {
        this.state.mode === ViewState.ON_GRAPHIQL
          ? (
            <GraphiQL
              fetcher={this.state.fetcher}
              storage={getOrCreateScopedStorage(this.state.chosenAppId!)}
              schema={this.state.schema}
            />
          )
          : this.state.mode === ViewState.ON_SELECT_APP
            ? (
              <NoAppSelected />
            )
            : this.state.mode === ViewState.ON_FETCHING_SCHEMA
              ? (
                <Spinner />
              )
              : (
                <ErrorState
                  onRetryClick={() => this.setState({ error: false })}
                />
              )
      }
    </Fragment>
  )

  private fetchSchema = async () => {
    try {
      const response = await this.state.fetcher!({ query: introspectionQuery })
      const schema = path(['data'], response) as IntrospectionQuery | undefined
      this.setState({
        schema: schema && buildClientSchema(schema),
        error: schema ? false : true,
      })
    }
    catch (_) {
      this.setState({ error: true })
    }
  }
}


export const GraphiQLController = injectIntl(GraphiQLControllerComponent)