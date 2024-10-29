// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

function Layout() {
    return (
        <Box>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Website
                    </Typography>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>
                        Home
                    </Link>
                    <Link to="/login" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>
                        Login
                    </Link>
                    <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>
                        Dashboard
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container sx={{ mt: 5 }}>
                <Outlet /> {/* This will render the page's content */}
            </Container>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', py: 2, mt: 5, backgroundColor: '#f0f0f0' }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} My Website. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Layout;
