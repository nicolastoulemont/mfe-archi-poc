import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EditContact, action, loader } from './EditContact'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@mfe-archi-poc/query'

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
