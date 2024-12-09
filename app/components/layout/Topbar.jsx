import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react';
import InputIcon from '@mui/icons-material/Input';
import DehazeIcon from '@mui/icons-material/Dehaze';
import XIcon from '@mui/icons-material/X';


const Topbar = (props) => {

    const handleMobileSidebar = () => {
        props.setToggle(!props.toggle);
    }

    return (
        <>
            <AppBar elevation={3} sx={{ backgroundColor: "#e0e0e0" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Options */}
                    <Box display="flex" sx={{ gap: '10px' }}>
                        <XIcon sx={{ color: '#616161', position: 'relative', top: '3px' }} />
                        <Typography variant='h5' sx={{ color: '#616161' }}>REPORTS</Typography>
                    </Box>

                    {/* Interactions */}
                    <Box display='flex' sx={{ width: '100%', justifyContent: 'end' }}>
                        <IconButton title="log out">
                            <InputIcon sx={{ fontSize: '28px' }} />
                        </IconButton>
                        <IconButton
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                            onClick={handleMobileSidebar}
                        >
                            <DehazeIcon sx={{
                                fontSize: '28px',
                                position: 'relative',
                                top: '2px'
                            }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Topbar