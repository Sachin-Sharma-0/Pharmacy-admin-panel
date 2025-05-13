// Define interfaces for type safety
export interface PermissionProfile {
  id: number;
  name: string;
  type: 'edit' | 'view';
  permissions: Record<string, string[]>;
}

export interface PermissionCategory {
  name: string;
  types: string[];
}

export interface PermissionSettings {
  categories: Record<string, string[]>;
}