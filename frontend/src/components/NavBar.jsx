import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/navbar.css"

const Navbar = () => {
    return (
      <AppBar position="sticky" sx={{ display: "flex", backgroundColor: "#19191a", boxShadow: "none", padding: "0 10px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
            <Link to="/" className="link"><Typography sx={{ mr: 2, fontSize: "30px", fontWeight: "bold", color: "#f7c313" }}>Ducky</Typography></Link>
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