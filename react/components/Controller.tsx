import GraphiQL from 'graphiql'
import React, { Fragment } from 'react'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

interface State {
  chosenAppId?: string
}

interface Props {
  apps: string[]
}

const fetcher = (appId: string) => (params: any) => fetch(`/_v/private/admin-graphiql/v0/${appId}`, {
  body: JSON.stringify(params),
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
}).then(response => response.json())

export class GraphiQLController extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      chosenAppId: undefined,
    }
  }

  public render = () => (
    <Fragment>
      <div className="mb5">
        <EXPERIMENTAL_Select
          label="Choose your app from the list below"
          options={this.props.apps.map(app => ({value: app, label: app}))}
          multi={false}
          onChange={(chosen) => this.setState({chosenAppId: chosen ? chosen.value : undefined})}
        />
      </div>
      {this.state.chosenAppId 
        ? <GraphiQL fetcher={fetcher(this.state.chosenAppId)} />
        : null
      }
    </Fragment>
  )
}
