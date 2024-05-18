export function generateRandomPassword(length = 10) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  const charsetLength = charset.length;

  // Ensure at least one character from each category
  const requirementGroups = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()]/];
  const randomGroups = requirementGroups.map(() =>
    Math.floor(Math.random() * charsetLength)
  );
  for (const index of randomGroups) {
    password += charset[index];
  }

  // Append remaining characters
  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset[randomIndex];
  }

  return password;
}
