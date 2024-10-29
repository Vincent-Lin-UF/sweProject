// src/pages/ErrorPage.js
import { useRouteError, Link } from "react-router-dom";
import { Typography, Box, Button, Container } from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container component="main" maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Oops!
            </Typography>
            <Typography variant="body1" paragraph>
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <i>{error.statusText || error.message}</i>
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" component={Link} to="/">
                    Go Back Home
                </Button>
            </Box>
        </Container>
    );
}
