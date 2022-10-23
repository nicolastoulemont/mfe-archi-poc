import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Contacts, action, loader } from './Contacts'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@poc/query'
import { rest } from 'msw'
import ErrorPage from '../../error-page'

export default {
  title: 'Contact/List',
  component: Contacts,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/contacts',
              element: <Story />,
              errorElement: <ErrorPage />,
              action: action(queryClient),
              loader: loader(queryClient),
            },
          ],
          { initialEntries: ['/contacts'], initialIndex: 0 }
        )}
      />
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Contacts>

const Template: ComponentStory<typeof Contacts> = (args: any) => <Contacts {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:3000/contacts', (req, res, ctx) => {
        // @ts-expect-error
        const query = req.query ?? { search: '' }
        const contacts = [
          {
            id: 1,
            createdAt: '2022-09-18T12:33:16.000Z',
            first: 'Nicolas',
            last: 'Toulemont',
            avatar: 'https://avatars.githubusercontent.com/u/40027895?v=4',
            twitter: '@NicoToulemont',
            notes: 'Engineer at PayFit',
            favorite: false,
          },
          {
            id: 2,
            createdAt: '2022-09-18T12:33:16.000Z',
            first: 'Cyril',
            last: 'Lopez',
            avatar: 'https://avatars.githubusercontent.com/u/13311463?v=4',
            twitter: '@soupette',
            notes: 'Engineer',
            favorite: false,
          },
          {
            id: 3,
            createdAt: '2022-09-18T12:33:16.000Z',
            first: 'Yann',
            last: 'Isabel',
            avatar: 'https://avatars.githubusercontent.com/u/19928886?v=4',
            twitter: '@yann_isabel',
            notes: 'Engineer',
            favorite: false,
          },
          {
            id: 4,
            createdAt: '2022-09-19T12:42:24.654Z',
            first: 'Sylvie',
            last: 'Nguyen',
            avatar: '',
            twitter: '@ssilbing',
            notes: 'Senior product designer',
            favorite: false,
          },
          {
            id: 8,
            createdAt: '2022-09-25T12:49:36.689Z',
            first: null,
            last: null,
            avatar: null,
            twitter: null,
            notes: null,
            favorite: false,
          },
        ]
        return res(ctx.json(contacts.filter(({ first, last }) => first?.includes(query) || last?.includes(query))))
      }),
    ],
  },
}
