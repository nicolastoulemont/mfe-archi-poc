import { queryClient, QueryClientProvider } from '@poc/query'
import { initialize, mswDecorator } from 'msw-storybook-addon'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

initialize()

export const decorators = [
  mswDecorator,
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    </QueryClientProvider>
  ),
]
