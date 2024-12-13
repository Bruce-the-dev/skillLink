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
          <ListItemText primary="/Course/add" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Achievements" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Assignments" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DashboardSidebar;
