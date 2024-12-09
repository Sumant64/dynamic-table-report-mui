import { Avatar, Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Item = (props) => {
    const { title, to, icon, selected, setSelected } = props;

    return (
      <MenuItem
        active={selected === title}
        style={{
          // color: colors.grey[100],
          color: `${selected === title ? "#666666" : "#141414"}`,
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link href={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

const SidebarComp = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const [userName, setUserName] = useState('Sumant');
    const [corporateName, setCorporateName] = useState("Reports")

    const handleClick = () => {

    }

  return (
    <Box
      sx={{
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .css-dip3t8': {
          backgroundColor: 'rgb(249, 249, 249, 0.95) !important',
        },
        height: '100vh',
        width: '100%',
        backgroundColor: '#f2f0f0'
      }}
    >
      <Sidebar
        backgroundColor={"#f2f0f0"}
        transitionDuration={400}
        onBackdropClick={() => props.setToggle(false)}
        toggled={props.toggle}
        collapsedWidth="80px"
        width="250px"
        collapsed={isCollapsed}
        breakPoint="sm"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#e2e2e2' : undefined,
                };
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: "#141414",
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar sx={{ height: '70px', width: '70px', fontSize: '35px' }}>{userName.slice(0, 1)}</Avatar>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" color={"#666666"} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  {userName.length > 14 ? `${userName.slice(0, 9)}...` : userName}
                </Typography>
                <Typography variant="h5" color={"#4cceac"}>
                  {corporateName}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Box onClick={() => handleClick()}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default SidebarComp