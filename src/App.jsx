//App.jsx

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App({ user, setUser }) {  // Use user from props
  return (
    <>
      {!user ? <Login setUser={setUser} /> : <Dashboard user={user} />}
    </>
  );
}
