import React, { FunctionComponent } from 'react'
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { EmptyState } from 'vtex.styleguide'

const messages = defineMessages({
  title: {
    id: 'admin/no-app-selected.title',
    defaultMessage: 'Choose an App'
  }
})

const NoAppSelectedComponent: FunctionComponent<InjectedIntlProps> = ({intl}) => (
  <EmptyState title={intl.formatMessage(messages.title)}>
    <p>
      <FormattedMessage 
        id='admin/no-app-selected.state'
        defaultMessage="Please choose an App to start making queries to"
      />
    </p>
  </EmptyState>
)

export const NoAppSelected = injectIntl(NoAppSelectedComponent)