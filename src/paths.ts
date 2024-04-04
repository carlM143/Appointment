export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    appointment: '/dashboard/appointment',
    messages: '/dashboard/messages',
    analytics: '/dashboard/analytics',
    contacts: '/dashboard/contacts',
    subscription: '/dashboard/subscription',
    helpcenter: '/dashboard/helpcenter',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
