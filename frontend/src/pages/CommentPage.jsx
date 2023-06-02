import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { red } from "@mui/material/colors";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

export default function CommentPage() {
  const [fundraiser, setFundraiser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/fundraisers/getOne/${id}`;
      const result = await axios.get(url);
      setFundraiser(result.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "2%" }}>
      <strong style={{ fontSize: 'larger' }}>Recent Donations</strong>
      {fundraiser && fundraiser.donations && fundraiser.donations.length > 0 ? (
        fundraiser.donations.slice(0, 5).map((donation) => (
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {donation.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={donation.comments}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                      {donation.name}
                    </Typography>
                    {` donated $${donation.amount}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon style={{ marginRight: '8px' }} />
          <Typography variant="body1">No comments available.</Typography>
        </div>
      )}
    </div>
  );
}
