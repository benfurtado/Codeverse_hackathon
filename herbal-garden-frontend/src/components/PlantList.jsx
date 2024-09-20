import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/plants/');
                setPlants(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchPlants();
    }, []);

    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <h1>Plant List</h1>
            <ul>
                {plants.map(plant => (
                    <li key={plant.id}>{plant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlantList;
