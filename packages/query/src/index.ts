import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
export type QueryClientType = typeof queryClient

export * from '@tanstack/react-query'
