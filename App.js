import 'react-native-gesture-handler';
import { AuthProvider } from './app/context/AuthContext';
import Layout from './app/screens/Layout';

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
