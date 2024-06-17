import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs/server', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: 'mockedUserId' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'mockedUserId',
        fullName: 'Charles Harris',
      },
    }),
  }

  return mockedFunctions
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

test(`Home`, async () => {
  render(await Page())
  expect(screen.getByText('The best Journal app, period.')).toBeTruthy()
})
