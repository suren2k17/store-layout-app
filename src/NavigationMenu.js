import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: 'navy',
    color: 'white',
  },
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const SubMenu = styled(ListItem)({
  paddingLeft: '30px', // Adjust padding for right alignment of submenu
});

function NavigationMenu() {
    const [open, setOpen] = useState({});
  
    const handleClick = (menu) => {
      setOpen({ ...open, [menu]: !open[menu] });
    };
  
    return (
      <StyledDrawer
        variant="permanent"
        anchor="left"
      >
        <List>
          {/* Store Layout Main Menu */}
          <ListItem button component={StyledLink} to="/store-layout">
            <ListItemText primary="Store Layout" />
          </ListItem>
  
          {/* Resets Main Menu */}
          <ListItem button onClick={() => handleClick('resets')}>
            <ListItemText primary="Resets" />
            {open['resets'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open['resets']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <SubMenu button component={StyledLink} to="/planogram-simulations">
                <ListItemText primary="Planogram Simulations" />
              </SubMenu>
              <SubMenu button component={StyledLink} to="/ai-recommendations">
                <ListItemText primary="AI Recommendations" />
              </SubMenu>
            </List>
          </Collapse>
  
          {/* Virtual Tours Main Menu */}
          <ListItem button onClick={() => handleClick('virtualTours')}>
            <ListItemText primary="Virtual Tours" />
            {open['virtualTours'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open['virtualTours']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <SubMenu button component={StyledLink} to="/ar-store">
                <ListItemText primary="AR Store" />
              </SubMenu>
            </List>
          </Collapse>
  
          {/* Store Insights Main Menu */}
          <ListItem button onClick={() => handleClick('storeInsights')}>
            <ListItemText primary="Store Insights" />
            {open['storeInsights'] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open['storeInsights']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <SubMenu button component={StyledLink} to="/customer-interactions">
                <ListItemText primary="Customer Interactions" />
              </SubMenu>
              <SubMenu button component={StyledLink} to="/sales">
                <ListItemText primary="Sales" />
              </SubMenu>
              <SubMenu button component={StyledLink} to="/inventory">
                <ListItemText primary="Inventory" />
              </SubMenu>
              <SubMenu button component={StyledLink} to="/supply-chain">
                <ListItemText primary="Supply Chain" />
              </SubMenu>
              <SubMenu button component={StyledLink} to="/localized-interactions">
                <ListItemText primary="Localized Interactions" />
              </SubMenu>
            </List>
          </Collapse>
  
          {/* Additional main menus can be added here */}
        </List>
      </StyledDrawer>
    );
  }

export default NavigationMenu;
