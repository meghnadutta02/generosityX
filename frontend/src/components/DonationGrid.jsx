import { Typography, Grid } from "@mui/material";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

export default function DonationGrid() {
  return (
    <div className="text-3xl my-4">
      Donate and help
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className="p-4 pt-12">
            <Typography variant="h5" component="h2" className="mb-4">
              Donate to the needy
            </Typography>
            <Typography variant="body1" className="mb-4 py-4">
              Join us in making a difference by donating to those in need - your
              contribution, no matter how small, can have a significant impact
              on the lives of individuals and communities facing challenging
              circumstances.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <div className="w-72 rounded-2xl border-2 border-gray-200 bg-white">
                <div className="flex flex-col items-center p-6">
                  <HandshakeOutlinedIcon style={{ fontSize: "50px" }} />
                  <span className="text-md mb-5 text-center text-gray-500">
                    Donate esssentials
                  </span>
                  <Link to="/items-donate">
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
                  <PeopleIcon style={{ fontSize: "50px" }} />
                  <span className="text-md mb-5 text-center text-gray-500">
                    Help our Organistaion
                  </span>
                  <Link to="/money-donate">
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
    </div>
  );
}
