'use client'
import React, { useState } from 'react'
import { Box } from '@mui/material';
import Topbar from './Topbar';
import SidebarComp from './Sidebar';

const MainLayout = (props) => {
    const [toggle, setToggle] = useState(false);

  return (
    <>
        <div style={{ boxSizing: 'border-box' }}>
          <Topbar toggle={toggle} setToggle={setToggle} />
          <div className="app" style={{ display: 'flex', position: 'relative', paddingTop: '4rem' }}>
            <div>
              <SidebarComp toggle={toggle} setToggle={setToggle} />
            </div>
            <Box sx={{ width: '100%', marginLeft: { xs: '0px', md: '20px' }, overflowY: 'auto' }}>
              {props.children}
            </Box>
          </div>
        </div>
    </>
  )
}

export default MainLayout