import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // הוסף את המפתח האישי שלך כאן

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.balldontlie.io/api/v1/players', {
          headers: {
            Authorization: `Bearer ${"afe25e37-3a9d-4920-a7fe-3aa9148367af"}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Players Data</h1>
      {data && (
        <ul>
          {data.data.map(player => (
            <li key={player.id}>{player.first_name} {player.last_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
