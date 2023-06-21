import React from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material";

export default function UnverifiedFundraisers() {
  return (
    <div style={{ minHeight: "90vh" }}>
      <Grid
  container
  sx={{
    '& > .MuiGrid-item': {
      marginBottom: '8%',
    },
  }}
>
        <Grid item xs={12}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className="mx-7">
            Hellokbuukcxdw Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Deserunt veniam omnis a recusandae sunt aliquam! Veritatis
            labore maxime nemo sequi accusantium, cupiditate nulla minima nihil
            dolores ipsa aliquid totam laudantium fuga voluptatibus reiciendis
            ea eum animi dignissimos iste aspernatur rem necessitatibus
            corporis? Modi quas dicta aperiam voluptate, dignissimos itaque
            blanditiis accusamus voluptates dolore repellendus numquam!
            Recusandae doloremque laborum assumenda possimus? Omnis
            consequuntur, tempore ad delectus, velit magnam natus quod, est
            officiis enim impedit. Officiis, cupiditate fugit sed, totam
            exercitationem nulla porro labore dolorum reprehenderit sapiente
            voluptas qui voluptate culpa. Incidunt laborum enim officia! Optio
            minima libero est pariatur! Hic, nobis!
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
