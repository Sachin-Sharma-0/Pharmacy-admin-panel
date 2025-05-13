// Define interfaces for type safety
export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  permissionRole: string;
  status: 'active' | 'disabled';
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  permissionRole: string;
}

export interface PermissionRole {
  id: number;
  name: string;
}