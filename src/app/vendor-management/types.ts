// Define interfaces for vendor management

export interface Vendor {
  vendor_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  address: string;
  total_products: number;
  status: 'approved' | 'pending' | 'on_hold' | 'rejected';
  is_blocked: boolean;
}

export interface StatusOption {
  value: 'approved' | 'pending' | 'on_hold' | 'rejected';
  label: string;
}