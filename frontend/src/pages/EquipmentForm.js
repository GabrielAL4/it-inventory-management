import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  createEquipment,
  updateEquipment,
  getEquipment,
  getPlatforms,
} from '../services/api';

const equipmentTypes = [
  'NOTEBOOK',
  'DESKTOP',
  'TELEVISION',
  'SMARTPHONE',
  'TABLET',
  'GAMING_CONSOLE',
];

const statusOptions = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'RETIRED'];

const EquipmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [platforms, setPlatforms] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    rfidTag: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    status: 'AVAILABLE',
    platformId: '',
    location: '',
    notes: '',
  });

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };

    const fetchEquipmentData = async () => {
      try {
        const data = await getEquipment(id);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchPlatforms();
    if (id) {
      fetchEquipmentData();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEquipment(id, formData);
      } else {
        await createEquipment(formData);
      }
      navigate('/equipment');
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {id ? 'Edit Equipment' : 'Add New Equipment'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="type"
                label="Equipment Type"
                value={formData.type}
                onChange={handleChange}
              >
                {equipmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace('_', ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="rfidTag"
                label="RFID Tag"
                value={formData.rfidTag}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="serialNumber"
                label="Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="manufacturer"
                label="Manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="model"
                label="Model"
                value={formData.model}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.replace('_', ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="platformId"
                label="Platform"
                value={formData.platformId}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {platforms.map((platform) => (
                  <MenuItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => navigate('/equipment')}>Cancel</Button>
            <Button type="submit" variant="contained">
              {id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EquipmentForm; 