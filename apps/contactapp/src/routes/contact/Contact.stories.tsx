import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
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
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Contact>

const Template: ComponentStory<typeof Contact> = (args: any) => <Contact {...args} />

export const Default = Template.bind({})

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
Default.play = async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
  //   await userEvent.click(loginButton);
}
