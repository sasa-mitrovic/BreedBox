import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Paper } from '@mantine/core';

const Home: React.FC = () => {
  const [buildingNumber, setBuildingNumber] = useState('');
  const [nestboxNumber, setNestboxNumber] = useState('');
  const navigate = useNavigate();

  const handleGoToNestbox = () => {
    // Assign the values using the setters
    setBuildingNumber(buildingNumber);
    setNestboxNumber(nestboxNumber);
    // Navigate to the Nestbox component
    navigate('/nestbox/'+buildingNumber+'/'+nestboxNumber);
  };

  return (
    <Paper shadow="lg" style={{ marginTop: 20, padding: 20, border : '10px outset #888' }}>
      <div>
        <h1>Home</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <Input
            placeholder="Building Number"
            value={buildingNumber}
            onChange={(e) => setBuildingNumber(e.currentTarget.value)}
          />
          <Input
            placeholder="Nestbox Number"
            value={nestboxNumber}
            onChange={(e) => setNestboxNumber(e.currentTarget.value)}
          />
        </div>
        <Button onClick={handleGoToNestbox}>Go To Nestbox</Button>
      </div>
    </Paper>
  );
};

export default Home;