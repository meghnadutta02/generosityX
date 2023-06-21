import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  const [selectedPage, setSelectedPage] = React.useState('Fundraisers'); // Track the selected page

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#c2e8e5'
         }} // Set the sidebar background color
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            bgcolor: '#50a6a0', 
            
            fontSize: '120%', 
            paddingLeft: '16px', 
          }}
        >
    
            Admin Dashboard
         
        </ListSubheader>
      }
    >
      
      
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Fundraisers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedPage === 'Verified'} // Highlight the selected page
            onClick={() => handlePageClick('Verified')}
          >
            <ListItemText primary="Verified" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedPage === 'Unverified'} 
            onClick={() => handlePageClick('Unverified')}
          >
            <ListItemText primary="Unverified" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick1}>
        <ListItemText primary="Campaigns" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedPage === 'Create new'} // Highlight the selected page
            onClick={() => handlePageClick('Create new')}
          >
            <ListItemText primary="Create new" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedPage === 'Ongoing'} 
            onClick={() => handlePageClick('Ongoing')}
          >
            <ListItemText primary="Ongoing" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        selected={selectedPage === 'Users'} // Highlight the selected page
        onClick={() => handlePageClick('Users')}
      >
        <ListItemText primary="Users" />
      </ListItemButton>
    </List>
  );
}
