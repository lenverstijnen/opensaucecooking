export function getFullName(user: {
  firstName?: string;
  lastName?: string;
}): string {
  return [user.firstName, user.lastName].filter((x) => !!x).join(" ");
}
