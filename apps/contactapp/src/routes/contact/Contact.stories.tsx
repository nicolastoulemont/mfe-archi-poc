import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Contact, action, loader } from './Contact'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from '@mfe-archi-poc/query'

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
