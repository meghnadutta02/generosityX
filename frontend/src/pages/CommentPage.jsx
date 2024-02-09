import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function CommentPage({ loaded }) {
  const [fundraiser, setFundraiser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://server.generosityx.app/api/fundraisers/getOne/${id}`;
      try {
        const result = await axios.get(url);
        setFundraiser(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "2%" }}>
      {loading ? (
        <div className="flex  justify-center items-center">
          <CircularProgress className="mt-7" />
        </div>
      ) : (
        <>
          <strong style={{ fontSize: "larger" }}>Recent Donations</strong>
          {fundraiser &&
          fundraiser.donations &&
          fundraiser.donations.length > 0 ? (
            fundraiser.donations.slice(0, 5).map((donation) => (
              <List sx={{ width: "100%", maxWidth: 360 }}>
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
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {donation.name}
                        </Typography>
                        {` donated $${donation.amount.toLocaleString("en-US")}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <InfoIcon style={{ marginRight: "8px" }} />
              <Typography variant="body1">No comments available.</Typography>
            </div>
          )}
        </>
      )}
    </div>
  );
}
