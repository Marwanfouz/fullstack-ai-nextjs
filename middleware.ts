import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const publicPaths = ['/sign-in(.*)', '/sign-up(.*)', '/']

const isProtectedRoute = createRouteMatcher(publicPaths)

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
