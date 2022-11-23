
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react' ;


const cardStyle = {
  display: "block",
  transitionDuration: "0.3s",
  height: "45vw",
  width: '45vw',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent:'center'
};



////// brainstorm
  //functions
// function to get all polls made by user
//use params
//use effect
//

//react context??

//put them in state with params for accessing
//create dropdown
//when click on poll, access by params
  //take to DISPLAY page of poll
// when click on add poll
  // take to create poll page

 const Homepage = () => {
  /////////// begin code
  const navigate = useNavigate();
  // polls state - need poll_id (params) and poll_name
  const [pollID, setPollID] = useState([]);
  const [pollName, setPollName] = useState([])

  // use effect & fetch to get all poll names 
  // use effect & fetch to get all poll ids

  useEffect(() => {
    fetch(`http://localhost:3000/api/poll`)
    .then(data => data.json())
    .then(data => {
      console.log(data)
      setPollID(data.poll_id);
    })
    .catch((err) => {
      log: "Error was found"
    })
  }, []);





//render all poll names
// render dropdown pollnames, when click on pollnames use id to take to correct display page

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

  )
}

export default Homepage;