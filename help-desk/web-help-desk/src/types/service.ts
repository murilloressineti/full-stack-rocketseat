export interface Service {
  id: string;
  name: string;
  description?: string | null;
  price: string | number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
