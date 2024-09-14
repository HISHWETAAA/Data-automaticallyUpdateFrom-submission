import React, { useRef } from 'react';
import SignupForm from './SignupForm';
import UserTable from './userTable';
import './style.css'

function App() {
  const userTableRef = useRef(null); // Create a reference to the UserTable component

  const handleUserAdded = () => {
    // Trigger data fetching in UserTable
    if (userTableRef.current) {
      userTableRef.current.fetchUsers(); // Manually trigger the fetchUsers function
    }
  };

  return (
    <div className="App">
      <h1>Signup Form</h1>
      <SignupForm onUserAdded={handleUserAdded} /> {/* Pass the callback to SignupForm */}
      
      <h1>User Data</h1>
      <UserTable ref={userTableRef} /> {/* Reference the UserTable to trigger updates */}
    </div>
  );
}

export default App;
