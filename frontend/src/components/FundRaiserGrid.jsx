import { Typography, Grid } from "@mui/material";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

export default function FundRaiserGrid() {
  return (
    <>
      <h2 className="text-4xl font-bold  inline border-b-4 border-blue-600 tracking-tight text-gray-900">
        Fundraisers
      </h2>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className="p-4 pt-12">
            <p className="mb-4 pt-4 text-xl">
              Help raise awareness and funds for various social issues.
              Contribute to meaningful change and connect with like-minded
              individuals and organizations and create a sense of community
              around a shared purpose.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Link to="/help-fundraiser">
                <div className="h-60 rounded-2xl border-4 border-blue-900 bg-white shadow-black shadow-2xl hover:scale-110 transition ease-in-out delay-50">
                  <div className="flex flex-col items-center p-6">
                    <HandshakeOutlinedIcon style={{ fontSize: "50px" }} />
                    <span className="text-md mb-5 text-center text-gray-500">
                      Contribute with funds
                    </span>
                    <button className="flex items-center rounded-md border-2 border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
                      <span>Select</span>
                    </button>
                  </div>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="rounded-2xl border-4 border-blue-900 bg-white h-60 shadow-black shadow-2xl hover:scale-110 transition ease-in-out delay-50">
                <Link to="/create-fundraiser">
                  <div className="flex flex-col items-center p-6">
                    <PeopleIcon style={{ fontSize: "50px" }} />
                    <span className="text-md mb-5 text-center text-gray-500">
                      Start a fundraiser
                    </span>
                    <button className="flex items-center rounded-md border-2 border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
                      <span>Select</span>
                    </button>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
