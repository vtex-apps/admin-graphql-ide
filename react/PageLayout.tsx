import React, { FunctionComponent } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

const messages = defineMessages({
  title: {
    id: 'admin/layout.title',
    defaultMessage: 'GraphQL IDE'
  }
})

// This component generates the base layout for this app.
const PageLayout: FunctionComponent<InjectedIntlProps> = ({ children, intl }) => (
  <Layout fullWidth pageHeader={<PageHeader title={intl.formatMessage(messages.title)} />}>
    <PageBlock>
      {children}
    </PageBlock>
  </Layout>
)

export default injectIntl(PageLayout)
