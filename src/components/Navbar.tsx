import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
        <AppBar position="static" style={{ background: '#fffff', display:'flex', justifyContent:'space-around' }}>
            <Toolbar>
                <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" component={Link} to="/" >
                    Home
                </Button>
                <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" component={Link} to="/contact">
                Contact
                </Button>
            </Toolbar>
        </AppBar>
        
  )
}

export default Navbar