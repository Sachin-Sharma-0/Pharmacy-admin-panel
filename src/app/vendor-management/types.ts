// Define interfaces for vendor management

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  onboardingDate: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  address: string;
  totalProducts: number;
  status: 'approved' | 'on_hold' | 'suspended';
  isBlocked: boolean;
}

export interface StatusOption {
  value: 'approved' | 'on_hold' | 'suspended';
  label: string;
}