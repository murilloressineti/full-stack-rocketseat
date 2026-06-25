export interface Client {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: "client";
}
