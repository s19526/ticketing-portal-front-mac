import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000">
                Ticketing Portal FJ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}