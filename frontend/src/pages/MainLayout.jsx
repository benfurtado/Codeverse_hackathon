import { Grid, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlantMap from './PlantMap.jsx';
import PlantList from './PlantList.jsx';

const MainLayout = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants'); // Update with your API endpoint
        setPlants(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch plants');
        console.error('Error fetching plants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  const handlePlantSelect = (plantId) => {
    setSelectedPlantId(plantId);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={8}>
        <PlantMap 
          plants={plants} 
          selectedPlantId={selectedPlantId}
          onPlantSelect={handlePlantSelect}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <PlantList 
          plants={plants} 
          selectedPlantId={selectedPlantId}
          onPlantSelect={handlePlantSelect}
        />
      </Grid>
    </Grid>
  );
};

export default MainLayout;  