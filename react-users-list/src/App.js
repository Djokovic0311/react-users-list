import React, { useState, useEffect } from 'react';
import Header from './Header';
import UserList from './UserList';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      {loading && <LoadingIndicator />}
      {!loading && error && <ErrorDisplay message={error} />}
      {!loading && !error && <UserList users={users} />}
    </div>
  );
}

export default App;
