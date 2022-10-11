import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SignIn, action } from './SignIn'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@mfe-archi-poc/query'

import { authMocks } from '@mfe-archi-poc/auth-mocks'
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
    handlers: [
      authMocks.signInFailure,
      // rest.post('http://localhost:3002/signin', (req, res, ctx) => {
      //   return res(
      //     ctx.json({
      //       email: 'n.toulemont@gmail.com',
      //       password: 'password',
      //       roles: [
      //         { accountId: 1, type: 'employee' },
      //         { accountId: 1, type: 'admin' },
      //       ],
      //     })
      //   )
      // }),
    ],
  },
}
