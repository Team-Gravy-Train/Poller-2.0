
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardStyle = {
  display: "block",
  transitionDuration: "0.3s",
  height: "45vw",
  width: '45vw',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent:'center'
};






export default function Homepage() {

// function to get all polls made by user










  return (
    <div className= 'all homepage'>
     
      <div className='mainCard' style={{ display:'flex', justifyContent:'center'}}>
        <Card style ={cardStyle} sx={{ minWidth: 275, maxwidth: '500' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: 'red' }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
      
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}