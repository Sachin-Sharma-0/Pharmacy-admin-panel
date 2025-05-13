// Define interfaces for dashboard analytics data

export interface StatItem {
  name: string;
  value: string;
  icon: React.ElementType;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  date?: string;
  rating?: number;
  revenue?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
}

// Chart data interfaces
export interface DoughnutChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

// Props interfaces for components
export interface StatCardProps {
  stat: StatItem;
}

export interface EntityListProps {
  title: string;
  entities: Vendor[] | Customer[];
  type: 'vendor-signup' | 'vendor-rating' | 'vendor-revenue' | 'customer-repeat';
  viewAllLink: string;
}