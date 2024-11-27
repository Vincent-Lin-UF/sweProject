// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import SiegeLogo from '../assets/siege-logo.png';

function Root() {
    return (
        <Box>
            {/* Header */}
            <AppBar position="static">
                <Toolbar
                style ={{backgroundColor: '#fff'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ flexGrow: 1 }} 
                        style={{ color: "#292729" }}
                    >
                    <Link to="/" style={{ textDecoration: 'none', color: '#292729', display: 'flex', alignItems: 'center' }}>
                        <img 
                            src={SiegeLogo} 
                            alt="Siege Logo" 
                            style={{ height: '40px', marginRight: '10px' }} // Adjust height and spacing as needed
                        />
                    </Link>
                    </Typography>
                    <Link to="/login" style={{ color: '#292729', textDecoration: 'none', margin: '0 10px' }}>
                        Login
                    </Link>
                    <Link to="/dashboard" style={{ color: '#292729', textDecoration: 'none', margin: '0 10px' }}>
                        Dashboard
                    </Link>
                </Toolbar>  
            </AppBar>

            {/* Main Content */}
            
                <Outlet /> {/* This will render the page's content */}

            {/* Footer */}
            <Box sx={{ textAlign: 'center', py: 2, mt: 5, backgroundColor: 'transparent' }}>
                <Typography variant="body2" color="text.secondary">
                Siege | {new Date().getFullYear()} 
                </Typography>
            </Box>
        </Box>
    );
}

export default Root;
