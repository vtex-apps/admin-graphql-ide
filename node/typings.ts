import type { ServiceContext } from '@vtex/api'

import type { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients>
}
