import { useSelector } from "react-redux";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";

const socket = io.connect("https://ecoderce.herokuapp.com");
// const socket = io.connect("http://localhost:8080");

const TextInput = () => {
  const userState = useSelector(state=>state.user)
  const [textCredentials, setTextCredentials] = useState("");

  const handleSendText = async (e) => {
    e.preventDefault();
    if (textCredentials !== "") {
      const messageData = {
        author: userState.userName,
        text: textCredentials,
        date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("newMessage", messageData);
    }
    setTextCredentials("");
    console.log("Message successfully sent");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTextCredentials(e.target.value)
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSendText}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          marginBottom: "10px",
          overflowWrap: "break-word",
          
        }}
      >
        <TextField
          autoComplete="text-input"
          name="text"
          required
          fullWidth
          id="text"
          label="Text Here"
          value={textCredentials}
          onChange={handleChange}
          onKeyPress={(e) => {e.key === "Enter" && handleSendText(e);}}
          autoFocus
        />
        <IconButton type="submit" aria-label="send">
          <SendIcon color="primary" />
        </IconButton>
      </Box>
    </>
  );
};

export default TextInput;
