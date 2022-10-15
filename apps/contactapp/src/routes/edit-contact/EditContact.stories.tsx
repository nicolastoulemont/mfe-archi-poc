import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EditContact, action, loader } from './EditContact'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@poc/query'
import { rest } from 'msw'
import ErrorPage from '../../error-page'

export default {
  title: 'Contact/Edit',
  component: EditContact,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/contacts/:contactId/edit',
              element: <Story />,
              errorElement: <ErrorPage />,
              action: action(queryClient),
              loader: loader(queryClient),
            },
          ],
          { initialEntries: ['/contacts/1/edit'], initialIndex: 0 }
        )}
      />
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof EditContact>

const Template: ComponentStory<typeof EditContact> = (args: any) => <EditContact {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:3000/contact/1', (req, res, ctx) => {
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
