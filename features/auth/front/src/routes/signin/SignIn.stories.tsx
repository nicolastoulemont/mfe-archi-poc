import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SignIn, action } from './SignIn'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@poc/query'

import { authMocks } from '@poc/auth_mocks'
import ErrorPage from '../../error-page'

export default {
  title: 'Auth/SignIn',
  component: SignIn,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/signin',
              element: <Story />,
              errorElement: <ErrorPage />,
              action: action(queryClient),
            },
          ],
          { initialEntries: ['/signin'], initialIndex: 0 }
        )}
      />
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SignIn>

const Template: ComponentStory<typeof SignIn> = (args: any) => <SignIn {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: [authMocks.signInFailure],
  },
}
