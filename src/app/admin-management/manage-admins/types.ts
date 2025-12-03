// Define interfaces for type safety
export interface Admin {
  admin_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  status: 'active' | 'disabled';
  created_at?: string;
}

export interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role_name: string;
  status?: string;
}

export interface PermissionRole {
  id: number;
  name: string;
}