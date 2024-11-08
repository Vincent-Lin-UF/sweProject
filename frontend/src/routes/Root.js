// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

function Root() {
    return (
        <Box>
            {/* Header */}
            <AppBar position="static">
                <Toolbar
                style ={{backgroundColor: '#fff'}}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} style ={{color: "#292729"}}
                    >
                        Siege
                    </Typography>
                    <Link to="/" style={{ color: '#292729', textDecoration: 'none', margin: '0 10px' }}>
                        Home
                    </Link>
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
