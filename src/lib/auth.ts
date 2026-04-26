const env = import.meta.env as Record<string, string | undefined>;

export const ADMIN_EMAIL = (env.ADMIN_EMAIL ?? "mthirumalai2905@gmail.com").toLowerCase();

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL;
}
