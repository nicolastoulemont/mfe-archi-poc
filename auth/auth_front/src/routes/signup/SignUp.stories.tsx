import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SignUp, action } from './SignUp'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@poc/query'
import ErrorPage from '../../error-page'
import { authMocks } from '../../../../auth_mocks/build'

export default {
  title: 'Auth/SignUp',
  component: SignUp,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/signup',
              element: <Story />,
              errorElement: <ErrorPage />,
              action: action(queryClient),
            },
          ],
          { initialEntries: ['/signup'], initialIndex: 0 }
        )}
      />
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SignUp>

const Template: ComponentStory<typeof SignUp> = (args: any) => <SignUp {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: [authMocks.getAccountSuccess],
  },
}
