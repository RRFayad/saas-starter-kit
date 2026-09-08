export const routes = {
  home: "/",
  pricing: "/pricing",
  signIn: "/sign-in",
  signUp: "/sign-up",
  payment: {
    success: "/payment/success",
    cancelled: "/payment/cancelled",
  },
  workspace: {
    overview: "/workspace/overview",
  },
  settings: {
    account: "/settings/account",
    billing: "/settings/billing",
  },
} as const;
