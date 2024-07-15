import React, { useState } from 'react';

const UserProfile = () => {
  const [preferences, setPreferences] = useState({
    location: {
      locationType: null,
      coordinates: [40.75122181, -73.97268023],
      radius: 3.7,
      neighborhood: ""
    },
    dayTime: {
      day: 2,
      time: 6
    },
    localeBusyness: {
      Quiet: 0,
      Average: 0,
      Busy: 0,
      importance: "Preference"
    },
    restaurantBusyness: {
      Quiet: 0,
      Average: 0,
      Busy: 0,
      importance: "Preference"
    }
  });

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/resturants', { // Ensure this matches your Flask route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: preferences })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Error:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const exportToJsonFile = (jsonData) => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    const data = await sendDataToBackend();
    if (data && data["response"] === "No Restaurants from selected preference") {
      alert("Nothing to show");
    } else if (data) {
      exportToJsonFile(data);
    }
  };

  return (
    <div>
      <button onClick={handleExport}>Export Preferences</button>
    </div>
  );
};

export default UserProfile;
