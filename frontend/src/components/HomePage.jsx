import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ducky from "../assets/ducky1.png";
import "../styles/homepage.css";
import mic from "../assets/mic.png"
import MicIcon from '@mui/icons-material/Mic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const routeChange = () =>{ 
        let path = `/chatPage`; 
        navigate(path);
      }

    return (
        <Box
        sx={{
            backgroundColor: "#F3F4F8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column"
        }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p className="gradient">Active Recall with Ducky</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <p>_____________________</p>
                    <Button variant="text" sx={{ 
                        backgroundColor: "#F3F4F8",
                        color: "black",
                        height: "60%",
                        '&:hover': {
                            backgroundColor: '#f7c313',
                            color: 'black',
                        },
                        marginTop: "10px",
                        fontFamily: `'Josefin Sans', sans-serif`,
                        textTransform: "none", 
                    }} onClick={routeChange}>Try now</Button>
                </div>
            </div>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                gap: "5%"
            }}>
                {/* <Box sx={{
                    border: "solid black 3px",
                    width: "400px",
                    height: "200px",
                    borderRadius: "8px",
                }}>
                    <div style={{ width: "250px", height: "80px", backgroundColor: "#f7c313", color: "black", borderRadius: "8px", marginTop: "15px", marginLeft: "10px", fontSize: "16px", padding: "10px" }}>
                        <i>Emulate real conversations and enhance retention</i>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "320px" }}></div>
                        <MoreHorizIcon fontSize="large"></MoreHorizIcon>
                    </div>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ width: "80%", height: "3px", backgroundColor: "black", color: "#F3F4F8", borderRadius: "8px", marginTop: "10px" }}>
                        </div>
                        <MicIcon sx={{ marginTop: "10px" }}></MicIcon>
                    </div>
                </Box>
                <p></p> */}
                <img src={ducky} alt="ducky" style={{ borderRadius: "50%", width: "400px", height: "400px" }}></img>
            </Box>
        </Box>
    )
}

export default HomePage;