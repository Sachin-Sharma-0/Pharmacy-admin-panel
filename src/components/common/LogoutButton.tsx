import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { removeAuthToken } from '@/utils/env';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove auth token
    removeAuthToken();
    
    // Clear any other auth data
    localStorage.removeItem('adminAuth');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
    >
      <FiLogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
}