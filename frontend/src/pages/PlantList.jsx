import { List, ListItem, ListItemText, Typography, Paper, Divider } from '@mui/material';

const PlantList = ({ plants, selectedPlantId, onPlantSelect }) => {
    return (
      <Paper elevation={3} sx={{ 
        p: 2, 
        height: '80vh', 
        overflow: 'auto', 
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        {/* ... keep existing Typography */}
  
        <List>
          {plants.map((plant, index) => (
            <div key={plant.id}>
              <ListItem 
                sx={{ 
                  py: 2,
                  backgroundColor: selectedPlantId === plant.id ? 'action.selected' : 
                                  index % 2 === 0 ? 'background.default' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer'
                  },
                  transition: 'background-color 0.3s ease'
                }}
                onClick={() => onPlantSelect(plant.id)}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold', 
                      color: selectedPlantId === plant.id ? 'primary.main' : 'text.primary'
                    }}>
                      {plant.name}
                    </Typography>
                  }
                  secondary={
                    selectedPlantId === plant.id && (
                      <>
                        {Object.entries(plant).map(([key, value]) => (
                          key !== 'id' && (
                          <Typography
                            key={key}
                            component="span"
                            display="block"
                            sx={{
                              color: 'text.secondary',
                              fontStyle: key === 'description' || key === 'medicinal_use' ? 'italic' : 'normal',
                              fontWeight: key === 'scientific_name' ? 'bold' : 'normal',
                            }}
                          >
                            <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                          </Typography>
                          )
                        ))}
                      </>
                    )
                  }
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
            </div>
          ))}
        </List>
      </Paper>
    );
  };

export default PlantList;