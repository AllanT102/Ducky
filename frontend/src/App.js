import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes, Link } from "react-router-dom";
import Navbar from './components/NavBar';
import { Container } from "@mui/material";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Fira Sans', 'sans-serif'
      ].join(','),
    }
  })
  return (
    <ThemeProvider theme={theme}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/chatPage" element={<ChatPage />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
