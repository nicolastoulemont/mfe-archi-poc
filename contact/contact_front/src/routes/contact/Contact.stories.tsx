import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Contact, action, loader } from './Contact'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@poc/query'
import { rest } from 'msw'
import ErrorPage from '../../error-page'

export default {
  title: 'Contact/Display',
  component: Contact,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/contacts/:contactId',
              element: <Story />,
              errorElement: <ErrorPage />,
              action: action(queryClient),
              loader: loader(queryClient),
            },
          ],
          { initialEntries: ['/contacts/1'], initialIndex: 0 }
        )}
      />
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Contact>

const Template: ComponentStory<typeof Contact> = (args: any) => <Contact {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:3000/contacts/1', (req, res, ctx) => {
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
