import React, { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function DeletionPage() {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }, []);

  return (
    <div style={{minHeight:"60vh",padding:"10% 3%"}} >
      <Alert severity="success" sx={{ fontSize: 'larger' }}>
        <strong>Cancelled!</strong>
        <br />
        Your item has been successfully deleted.
      </Alert>
    </div>
  );
}
