import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Box, Paper, List, Container, Typography, CircularProgress, Avatar, Button } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import StopIcon from '@mui/icons-material/Stop';
import ducky from "../assets/ducky1.png";
import team from "../assets/team.png";
import { useNavigate } from "react-router-dom";


const ChatPage = () => {
    const [allMessages, setAllMessages] = useState([{user: false, message: "Hi! I have compiled your notes, that's some seriously interesting stuff. Let's start studying, ask or tell me anything!" }]);
    const [userMessages, setUserMessages] = useState([]);
    const [userInputText, setUserInputText] = useState("");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [doneLoading, setDoneLoading] = useState(false);
    const [isUserTurn, setIsUserTurn] = useState(true);
    const navigate = useNavigate();

    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
      }

    
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        console.log(allMessages);
    }, [allMessages])
    
    // const Microphone = () => {
      
    //     if (!browserSupportsSpeechRecognition) {
    //       return <span>Browser doesn't support speech recognition.</span>;
    //     }
      
    //     return (
    //       <div style={{ width: "100px", height: "100px", border: "solid red 2px"}}>
    //         <p>Microphone: {listening ? 'on' : 'off'}</p>
    //         <button onClick={SpeechRecognition.startListening}>Start</button>
    //         <button onClick={SpeechRecognition.stopListening}>Stop</button>
    //         <button onClick={resetTranscript}>Reset</button>
    //         <p>{transcript}</p>
    //       </div>
    //     );
    //   };
    

    useEffect(() => {
        if (pdfFile) handleSubmitPdf();
    }, [pdfFile])

    const onDrop = useCallback(acceptedFiles => {
        setPdfFile(acceptedFiles[0]);
        setFileUploaded(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "application/pdf",
        multiple: false
    });

    
    const message = ({ user, message }, idx) => {
        return (
            user ? 
            <Typography sx={{ textAlign: "right", backgroundColor: "white", mb: 2.5, p: 2, borderRadius: '8px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", display: 'flex', justifyContent: "flex-end", alignItems: "center", gap: "10px"}} key={idx}>
                {message} 
                <Avatar alt="ducky" src={team} sx={{
                    width: "30px",
                    height: "30px",
                }} />
            </Typography> : 
            <Typography sx={{ textAlign: "left", backgroundColor: "#CAD5E2", mb: 2.5, p: 2, borderRadius: '8px', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: "10px" }} key={idx}>
                <Avatar alt="ducky" src={ducky} sx={{
                    width: "30px",
                    height: "30px",
                }}/>
                {message}
            </Typography>
        )
    }
    
    // api calls

    const storeUserInput = async (text) => {
        axios.post('http://localhost:3001/store', { prompt: text }, {
            Headers: {
                'Content-Type': "application/json"
            }
        }).then(res => {
            setDoneLoading(true);
            console.log('userdata has been stored');
        })
    }
    
    const handleSubmitPdf = async () => {
        console.log('entered handle submit')
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        await axios.post('http://localhost:3001/pdfToText', formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }   
        })
        .then(res => {
            setUserInputText(res.data.text);
            storeUserInput(res.data.text);
            console.log(res.data.text);
        })
        .catch(err => console.log(err));
    }   
        
    const triggerDuckyResponse = async (msg, toAdd) => {
        console.log('ducky resonse triggered')
        axios.post('http://localhost:3001/message', { newMessage: msg }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setAllMessages([...allMessages, toAdd, { user: false, message: res.data.message}]);
            resetTranscript();
        });
    }

    const handlePlay = (event) => {
        SpeechRecognition.startListening();
        setIsUserTurn(true);
        console.log('hello');
    }

    const handleStop = async () => {
        SpeechRecognition.stopListening();
        setIsUserTurn(false);
        setAllMessages([...allMessages, { user: true, message: transcript }]);
        await triggerDuckyResponse(transcript, { user: true, message: transcript });
        // await triggerDuckyResponse("hello");
    }
    
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: "5%",
                gap: "15%"
            }}>
                {
                    doneLoading && <Avatar alt="ducky" src={ducky} sx={{
                        width: "100px",
                        height: "100px",
                    }}></Avatar>
                }
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}> 
                    {
                    !doneLoading && <Box sx={{ width: "600px", height: "500px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: "8px" }}>
                        <div {...getRootProps()} style={{ cursor: "pointer" }}>
                            <input {...getInputProps()} style={{ cursor: "pointer", display: "none" }} />
                            {
                                isDragActive ?
                                !fileUploaded && <p>Drop the files here ...</p> :
                                !fileUploaded && <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center"}}><FileUploadIcon fontSize="large"></FileUploadIcon><Typography>Upload PDF</Typography></Box>
                            }
                            {!doneLoading && (
                                 pdfFile && <CircularProgress sx={{ color: "#f7c313" }}/>
                            )}
                        </div>
                    </Box>
                    }
                    {
                    doneLoading && <Box>
                        <Paper style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 0px 8px 0px", width: "600px", height: "500px", overflow: 'auto', padding: '20px'}}>
                            {
                                allMessages.map((mesObj, idx) => message(mesObj, idx))
                            }
                        </Paper>
                    </Box>
                    }   
                    {
                    doneLoading && <Box>
                        <Box sx={{
                            border: "solid #19191a 1px",
                            width: "600px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px"
                        }}> 
                            <MicIcon onClick={handlePlay} sx={{ cursor: "pointer" }}></MicIcon> 
                            <StopIcon onClick={handleStop} sx={{ cursor: "pointer" }}></StopIcon>
                            {/* <Microphone></Microphone> */}
                        </Box>
                    </Box>
                    }   
                </Box>
                {
                    doneLoading && <Avatar alt="ducky" src={team} sx={{
                        width: "100px",
                        height: "100px"
                    }}></Avatar> 
                }
            </Box>
            {
                doneLoading && <Button variant="text" sx={{ 
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
                 }} onClick={routeChange}>Go home</Button>
            }
        </Box>
    )
    
    }

    export default ChatPage;