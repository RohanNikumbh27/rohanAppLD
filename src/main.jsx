//main.jsx

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LaunchDarklyProvider from "./context/LaunchDarklyProvider";
import { useState } from "react";

function RootComponent() {
  const [user, setUser] = useState(null);  // Store logged-in user

  return (
    <LaunchDarklyProvider user={user}>
      <App user={user} setUser={setUser} />
    </LaunchDarklyProvider>
  );
}

createRoot(document.getElementById('root')).render(<RootComponent />);
