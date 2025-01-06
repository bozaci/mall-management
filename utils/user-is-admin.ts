/**
 * Checks if the user has admin privileges based on the provided session.
 *
 * This function looks into the session object to determine if the user has the 'isAdmin' flag set to true.
 * If the 'isAdmin' flag is present and true, the function returns true, indicating the user has admin privileges.
 * If the 'isAdmin' flag is missing or false, the function returns false, indicating the user is not an admin.
 *
 * @param session - The session object containing user data, including the 'isAdmin' flag.
 * @returns A boolean value indicating whether the user has admin privileges (true) or not (false).
 */
export const userIsAdmin = ({ session }: { session?: any }) => {
  if (!session) return false;

  return Boolean(session?.data.isAdmin);
};
