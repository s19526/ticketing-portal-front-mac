import Toolbar from "@mui/material/Toolbar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Fingerprint} from "@mui/icons-material";
import {Navigation} from "../Navigation/Navigation";

export default function MenuBar() {
    return(
        <AppBar position="sticky" color="secondary">
        <Toolbar sx={{justifyContent: "space-between"}}>
        <Box sx={{ display: 'flex', alignItems:"center"}}>
            <AddCommentIcon sx={{ mr: 2}}/>
            <Typography sx={{ mr: 5 }} variant="h6" color="inherit" noWrap>
                Ticketing Platform
            </Typography>
            <Navigation/>
        </Box>


        </Toolbar>
        </AppBar>
    )
}

/*
            <ButtonGroup  size="large" variant="contained" aria-label= "button group" color="secondary">
                <Button>Customer Portal</Button>
            </ButtonGroup>


            <ButtonGroup sx={{ display: 'flex'}} variant="contained" aria-label="outlined primary button group">
            <Button><Fingerprint sx={{ mr:2}} color="palette.primary.light"/>Login</Button>
            <Button>Register</Button>
            </ButtonGroup>
*/