export interface Rider {
  rider_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  vehicle_type: string;
  license_number: string;
  rating: number;
  status: 'available' | 'on_delivery' | 'offline';
  is_blocked: boolean;
  created_at: string;
  total_deliveries: number;
}

export interface RiderFormData {
  full_name: string;
  phone_number: string;
  email: string;
  vehicle_type: string;
  license_number: string;
  status: 'available' | 'on_delivery' | 'offline';
  is_blocked: boolean;
}