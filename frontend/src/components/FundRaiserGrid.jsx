import { Typography,Grid } from "@mui/material"; 
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

export default function FundRaiserGrid() {
  return (
    <>
    Fundraiser
    <Grid container spacing={4} className="">
      <Grid item xs={12} md={6}>
        <div className="p-4 pt-12">
          <Typography variant="h5" component="h2" className="mb-4">
            Fundraiser Details
          </Typography>
          <Typography variant="body1" className="mb-4 pt-4">
            Help raise awareness and funds for various social issues.
            Contribute to meaningful change and connect with like-minded individuals and organizations and create a sense of community around a shared purpose.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className="w-72 rounded-2xl border-2 border-gray-200 bg-white">
  <div className="flex flex-col items-center p-6">
    <HandshakeOutlinedIcon style={{ fontSize: '50px' }}/>
    <span className="text-md mb-5 text-center text-gray-500">
      Contribute with funds</span>
     <Link to="/help-fundraiser">
    <button className="flex items-center rounded-md border-2 border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
      <span>Select</span>
    </button>
       </Link>
  </div>
</div>
          </Grid>
         
          <Grid item xs={12} sm={6}>
           <div className="w-72 rounded-2xl border-2 border-gray-200 bg-white">
  <div className="flex flex-col items-center p-6">
        <PeopleIcon style={{ fontSize: '50px' }}/>
    <span className="text-md mb-5 text-center text-gray-500">Start a fundraiser</span>
  <Link to="/create-fundraiser">
    <button className="flex items-center rounded-md border-2 border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
      <span>Select</span>
    </button>
    </Link>
  </div>
</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
 </>
      );
};

