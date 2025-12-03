export interface Product {
  product_id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description?: string;
  image_url?: string;
  vendor_id?: string;
  vendor_name?: string;
  created_at: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description: string;
  image_url: string;
  vendor_id: string;
}