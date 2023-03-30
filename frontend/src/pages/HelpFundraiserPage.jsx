import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from 'react-router-dom';


export default function HelpFundraiserPage() {
  const [fundraisers, setFundraisers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/fundraisers";
      const result = await axios.get(url);
      setFundraisers(result.data.fundraisers);
    };
    fetchData();
  }, []);

  return (
     <div className='container p-16 lg:px-60'>
    <h2 className='text-4xl font-bold text-center mb-8'>   Help these fundraisers </h2>
       <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
    {fundraisers.map((fundraiser) => (
      <Card sx={{ maxWidth: 345 }} className="border-2 border-red-300">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {fundraiser.creator.name.charAt(0)}
          </Avatar>
        }
       
        title={fundraiser.title}
        subheader={fundraiser.creator.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={fundraiser.image[0].path}
        alt="Fundraiser image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         Funds raised : {fundraiser.currentAmount}        </Typography>
           <Typography variant="body2" color="text.secondary">
         Target : {fundraiser.goalAmount}        </Typography>
     
      </CardContent>
      <CardActions disableSpacing>
        
        <Link to={`/help-fundraiser/${fundraiser._id}`}>
          <IconButton aria-label="add to favorites">
            <PaymentsIcon /> <span className='text-base ml-2'>Contribute</span> 
          </IconButton>
         </Link>
        
{/*           <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
{/*       <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
           {fundraiser.description}
          </Typography>
        
        </CardContent>
      </Collapse> */}
    </Card>
  ))}
         </div>
      </div>
      );
}