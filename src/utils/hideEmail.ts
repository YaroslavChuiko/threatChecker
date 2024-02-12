export const hideEmail = (email: string) => {
  const [name, domain] = email.split("@");

  if (!name || !domain) {
    return email;
  }

  return `${name.slice(0, 2)}${"•".repeat(name.slice(2).length)}@${domain}`;
};
