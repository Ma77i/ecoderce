import React from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export const TextInput = () => {
    return (
        <>
            <Box component="form" sx={{
                display: "flex",
                justifyContent: "center",
                width: "95%",
                margin: "auto"
            }}  
            noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Text here"
                sx={{
                    width: "100%"
                }}
                //margin="normal"
            />
            <Button variant="contained" color="primary">
                <SendIcon />
            </Button>
            </Box>
        </>
    )
}



