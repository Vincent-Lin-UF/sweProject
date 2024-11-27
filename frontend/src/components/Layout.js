import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import NavBar from './NavBar';

function Layout() {
    return (
        <Box>
            <NavBar />

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>

            <Box sx={{ textAlign: 'center', py: 2, mt: 5, backgroundColor: '#f9f9f9' }}>
                <p style={{ margin: 0 }}>
                    © {new Date().getFullYear()} Siege. All Rights Reserved.
                </p>
            </Box>
        </Box>
    );
}

export default Layout;
