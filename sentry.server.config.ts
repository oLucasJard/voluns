// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    environment: process.env.NODE_ENV,

    // Ignore common errors
    ignoreErrors: [
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND',
    ],

    beforeSend(event) {
      // Filter sensitive data
      if (event.request?.headers) {
        delete event.request.headers['authorization']
        delete event.request.headers['cookie']
      }

      return event
    },
  })
}

