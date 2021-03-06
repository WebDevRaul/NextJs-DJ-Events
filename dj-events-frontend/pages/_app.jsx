import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;