import React, { FunctionComponent } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps, defineMessages } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

interface Props extends InjectedIntlProps {
  onRetryClick: () => void
}

const messages = defineMessages({
  errorShortMessage: {
    id: 'admin/error.title',
    defaultMessage: 'Something bad happened'
  }
})

const ErrorStateComponent: FunctionComponent<Props> = ({onRetryClick, intl}) => (
  <EmptyState title={intl.formatMessage(messages.errorShortMessage)}>
    <div className="pt5">
      <Button variation="secondary" size="small" onClick={onRetryClick}>
        <span className="flex align-baseline">
          <FormattedMessage id="admin/error.state" defaultMessage="Try Again" />
        </span>
      </Button>
    </div>
  </EmptyState>
)

export const ErrorState = injectIntl(ErrorStateComponent)