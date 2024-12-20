import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';
import SiegeLogo from '../assets/siege-logo.png';
import {useAuth} from "../AuthProvider";


function NavBar() {
    const { isAuthenticated } = useAuth();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={SiegeLogo} alt="Siege Logo" style={{ height: '40px' }} />
                    </Link>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#292729' }}>
                        Home
                    </Link>
                    {
                        isAuthenticated ?
                          (<Link to="/profile" style={{ textDecoration: 'none', color: '#292729' }}>
                              Profile
                          </Link>) :
                          (<Link to="/login" style={{ textDecoration: 'none', color: '#292729' }}>
                              Login
                          </Link>)
                    }
                    <Link to="/workouts" style={{ textDecoration: 'none', color: '#292729' }}>
                        Workouts
                    </Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#292729' }}>
                        Dashboard
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
