export const queryKeys = {
  business: {
    all: ["business"] as const,
    details: (id: string) =>
      [...queryKeys.business.all, "details", id] as const,
    appointment: (id: string) =>
      [...queryKeys.business.all, "appointment", id] as const,
    transfer: (id: string) =>
      [...queryKeys.business.all, "transfer", id] as const,
    callTransferTool: (id: string) =>
      [...queryKeys.business.all, "call-transfer-tool", id] as const,
  },
  users: {
    all: ["users"] as const,
    me: () => [...queryKeys.users.all, "me"] as const,
    userBusinesses: () => [...queryKeys.users.all, "businesses"] as const,
    team: (businessId: string) =>
      [...queryKeys.users.all, "team", businessId] as const,
    invitations: (businessId: string) =>
      [...queryKeys.users.all, "invitations", businessId] as const,
  },
  superAdmin: {
    all: ["super-admin"] as const,
    businesses: (params?: { page?: number; limit?: number }) =>
      [...queryKeys.superAdmin.all, "businesses", params] as const,
    users: (params?: { search?: string; role?: string }) =>
      [...queryKeys.superAdmin.all, "users", params] as const,
  },
  calls: {
    all: ["calls"] as const,
    list: (businessId: string, params?: { page?: number; limit?: number }) =>
      [...queryKeys.calls.all, "list", businessId, params] as const,
    details: (id: string) => [...queryKeys.calls.all, "details", id] as const,
  },
  billing: {
    subscription: (businessId: string) => ["billing", businessId] as const,
  },
};
