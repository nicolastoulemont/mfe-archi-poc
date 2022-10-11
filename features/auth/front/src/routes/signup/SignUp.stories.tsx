import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SignUp, action } from './SignUp'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@mfe-archi-poc/query'
import { rest } from 'msw'
import ErrorPage from '../../error-page'

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
    handlers: [
      rest.get('http://localhost:3002/account/1', (req, res, ctx) => {
        return res(
          ctx.json({
            first: 'Nicolas',
            last: 'Toulemont',
            avatar: 'https://avatars.githubusercontent.com/u/40027895?v=4',
            twitter: '@NicoToulemont',
            notes: 'Full stack engineer',
            favorite: false,
          })
        )
      }),
    ],
  },
}
