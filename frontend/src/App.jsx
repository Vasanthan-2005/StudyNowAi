// File: /src/App.jsx
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;
