import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import io from 'socket.io-client'

const socket = io();

const API_CHATS = "http://localhost:8080/api/chat";

export const TextInput = () => {
  const { user } = React.useContext(AuthContext);
  const [chat, setChat] = React.useState([]);
  const [textCredentials, setTextCredentials] = React.useState({
    author: {
      email: user.email,
      firstName: user.userName,  
    },
    text: "",
  });

  const handleText = (e) => {
    e.preventDefault();
    socket.emit("newMessage", textCredentials);
    e.target.reset();
    console.log("SENDING", textCredentials);

    // e.preventDefault();
    // axios
    //   .post(API_CHATS, textCredentials)
    //   .then(({ data }) => {
    //     console.log(data.message);
    //     setChat(data.chat);
    //   })
    //   .catch((err) => console.log("Error getting chats", err));
    //   console.log(textCredentials);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTextCredentials({
      ...textCredentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleText} 
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          margin: "auto"
        }}>
        <TextField
          autoComplete="text-input"
          name="text"
          required
          fullWidth
          id="text"
          label="Text Here"
          value={textCredentials.text}
          onChange={handleChange}
          autoFocus
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </Box>
      {/* <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          margin: "auto"
        }}
        noValidate
        onSubmit={handleText}
      >
        <TextField
          id="standard-text"
          label="Text here"
          sx={{
            width: "100%"
          }}
          value={textCredentials.text}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          <SendIcon />
        </Button>
      </Box> */}
    </>
  );
};
