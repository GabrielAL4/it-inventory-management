import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  Laptop as LaptopIcon,
  DesktopWindows as DesktopIcon,
  Tv as TvIcon,
  Phone as PhoneIcon,
  Tablet as TabletIcon,
  SportsEsports as GamingIcon,
} from '@mui/icons-material';
import { getEquipments } from '../services/api';

const DashboardCard = ({ title, count, icon: Icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      bgcolor: color,
      color: 'white',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      <Icon sx={{ fontSize: 40 }} />
    </Box>
    <Typography component="p" variant="h4" sx={{ mt: 2 }}>
      {count}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    notebooks: 0,
    desktops: 0,
    televisions: 0,
    smartphones: 0,
    tablets: 0,
    gamingConsoles: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const equipment = await getEquipments();
        const newStats = {
          notebooks: equipment.filter(e => e.type === 'NOTEBOOK').length,
          desktops: equipment.filter(e => e.type === 'DESKTOP').length,
          televisions: equipment.filter(e => e.type === 'TELEVISION').length,
          smartphones: equipment.filter(e => e.type === 'SMARTPHONE').length,
          tablets: equipment.filter(e => e.type === 'TABLET').length,
          gamingConsoles: equipment.filter(e => e.type === 'GAMING_CONSOLE').length,
        };
        setStats(newStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Notebooks', count: stats.notebooks, icon: LaptopIcon, color: '#1976d2' },
    { title: 'Desktops', count: stats.desktops, icon: DesktopIcon, color: '#2196f3' },
    { title: 'TVs', count: stats.televisions, icon: TvIcon, color: '#03a9f4' },
    { title: 'Smartphones', count: stats.smartphones, icon: PhoneIcon, color: '#00bcd4' },
    { title: 'Tablets', count: stats.tablets, icon: TabletIcon, color: '#009688' },
    { title: 'Gaming Consoles', count: stats.gamingConsoles, icon: GamingIcon, color: '#4caf50' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 