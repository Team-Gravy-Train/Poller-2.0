import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '45vw',
  width: '45vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  // const [pollID, setPollID] = useState([]);
  // const [pollName, setPollName] = useState([]);

  const [pollData, setPollData] = useState([]);

  // use effect & fetch to get all poll names
  // use effect & fetch to get all poll ids

  useEffect(() => {
    fetch('/api/poll')
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPollData(data);
      })
      .catch((err) => {
        log: 'Error was found';
      });
  }, []);

  //   for (let i = 0; i < pollData.length; i++)
  //  {}

  // console.log('polldata length' + pollData.length);
  const dataLoop = () => {
    const pollIDs = [];
    const pollNames = [];
    for (let i = 0; i < pollData.length; i++) {
      let pollObj = pollData[i];
      pollIDs.push(pollObj.poll_id);
      pollNames.push(pollObj.poll_name);
    }
    console.log('pollids' + pollIDs);
    console.log('pollnames' + pollNames);
  }
  dataLoop();







  // think about how we will know the relationship between the pollname in dropdown and it's id? use an obj?

  // create dropdown menu
  // add each poll to the dropdown menu ***
  // add onlick for chosen poll
    // fetch to that poll
    // navigate to that poll's display page



















  //render all poll names
  // render dropdown pollnames, when click on pollnames use id to take to correct display page
  return (
    <div className="all homepage">
      <h1> </h1>
      <div
        className="mainCard"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card style={cardStyle} sx={{ minWidth: 275, maxwidth: '500' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, color: 'red' }}
              color="text.secondary"
              gutterBottom
            ></Typography>

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
};

export default Homepage;
