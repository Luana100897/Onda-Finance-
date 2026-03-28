import { useAuthStore } from '@/store/useAuthStore';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';

function App() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default App;
