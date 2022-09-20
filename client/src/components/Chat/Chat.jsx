import React from "react";
import Paper from "@mui/material/Paper";
import TextInput from "./TextInput.jsx";
import Message from "./Message";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import io from "socket.io-client";
import { useSelector } from "react-redux";


const socket = io.connect("https://ecoderce.herokuapp.com");
// const socket = io.connect("http://localhost:8080");

const Chat = () => {
  const userState = useSelector(state=>state.user)
  const [messagesList, setMessagesList] = React.useState([]);

  if (userState) {
    socket.emit("join_chat", userState.userName);
  }

  React.useEffect(() => {
    socket.on("messages", (data) => {
      setMessagesList((list) => [...list, data]);
      console.log(`Message from ${data.author} received`);
    });
  }, []);

  // React.useEffect(() => {
  //   API.get(API_CHAT)
  //     .then(({res}) => {
  //       console.log(res);
  //       console.log(res.message);
  //       setMessagesList(res.chat)
  //     })
  //     .catch(err => console.log(err))
  //   socket.on("messages", (data) => {
  //     console.log(`Message from ${data.author} received`);
  //   });
  // }, []);

  console.log("MessageList", messagesList);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        <Paper
          sx={{
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontFamily: "Helvetica Neue, sans-serif",
              fontSize: "4rem",
              fontWeight: "bold",
              letterSpacing: "0.3rem",
              color: "#0d1b2a",
            }}
            gutterBottom
          >
            CHAT
          </Typography>
          <Paper
            sx={{
              width: "calc( 100% - 20px )",
              margin: "10px",
              // overflowY: "scroll",
              height: "calc( 100% - 80px )"
            }}
          >
            <Message messageContent={messagesList} />
          </Paper>
          <TextInput />
        </Paper>
      </Box>
    </>
  );
};

export default Chat;
