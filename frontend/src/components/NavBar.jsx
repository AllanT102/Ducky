import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
      <AppBar position="sticky" sx={{ display: "flex", backgroundColor: "#19191a", boxShadow: "none", padding: "0 10px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
            <Typography sx={{ mr: 2, fontSize: "30px", fontWeight: "bold", color: "#f7c313" }}>Ducky</Typography>
            <Button variant="text" sx={{ 
                backgroundColor: "#F3F4F8",
                color: "black",
                height: "60%",
                '&:hover': {
                    backgroundColor: '#f7c313',
                    color: 'black',
                },
                textTransform: "none", 
                }}>Sign In</Button>
        </Toolbar>
      </AppBar>
    );
  };

  export default Navbar;