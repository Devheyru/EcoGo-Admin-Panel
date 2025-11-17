export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  canOverride: boolean;
  role: "admin";
  createdAt: Date;
}

export const createAdminData = (data: Omit<Admin, "createdAt">): Admin => ({
  ...data,
  createdAt: new Date(),
});
