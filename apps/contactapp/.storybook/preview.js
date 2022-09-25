import { queryClient, QueryClientProvider } from '@mfe-archi-poc/query'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    </QueryClientProvider>
  ),
]
