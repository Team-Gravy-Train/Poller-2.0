import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Homepage from './Homepage.jsx';
import { useNavigate } from "react-router-dom";



export default function Dropdown(props) {
  const [open, setOpen] = React.useState(false);

  let pollData = props.pollData
  const navigate = useNavigate();

  //button
  const pollClick = () => {
    navigate(`/display/${poll_id}`)
  }
  // url for get all fetch api/poll/${poll_id}

  // button functionality
  const handleClick = () => {
    setOpen(!open);
  };





  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Your Polls" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {pollData.map((el) => (
          <ListItemButton sx={{ pl: 4 }} key= {el.poll_id} href={`/poll/${el.poll_id}`}>
              <ListItemIcon>
            < AcUnitIcon  />
          </ListItemIcon>
              <ListItemText primary={el.poll_name} />
          </ListItemButton>
        ))}
        </List>
      </Collapse>

    </List>
  );
}
