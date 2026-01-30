import { UserData } from "../types/UsersTypes";

export const canEdit = (targetRole: string, userData: UserData | null) => {
  if (!userData) return false;

  // VIEWER → cannot change anyone
  if (userData.role === "viewer") return false;

  // EDITOR → can’t change admins or owner
  if (userData.role === "editor") {
    return (
      targetRole !== "editor" &&
      targetRole !== "admin" &&
      targetRole !== "owner"
    );
  }

  // ADMIN → can change anyone except owner
  if (userData.role === "admin") {
    return targetRole !== "admin" && targetRole !== "owner";
  }

  // OWNER → can change anyone
  if (userData.role === "owner") {
    return true;
  }

  return true;
};
