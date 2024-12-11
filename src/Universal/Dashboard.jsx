import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

function DashboardSidebar() {
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Kanban" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DashboardSidebar;
