export function getInitials(firstName?: string, lastName?: string) {
  const firstNameLetter = (firstName && firstName[0]) || "";
  const lastNameLetter = (lastName && lastName[0]) || "";
  return firstNameLetter + lastNameLetter;
}
