import React from "react";
import Paper from "@mui/material/Paper";
import TextInput from "./TextInput.jsx";
import Message from "./Message";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import io from "socket.io-client";
import { AuthContext } from "../../Context/AuthContext";


// import axios from 'axios';
// const API_CHAT = "http://localhost:8080/api/chat";
const socket = io.connect("http://localhost:8080");

const Chat = () => {
  const { user } = React.useContext(AuthContext);
  const [messagesList, setMessagesList] = React.useState([]);

  if (user) {
    socket.emit("join_chat", user.userName);
  }

  React.useEffect(() => {
    socket.on("messages", (data) => {
      setMessagesList((list) => [...list, data]);
      console.log(`Message from ${data.author} received`);
    });
  }, []);

  // React.useEffect(() => {
  //   axios.get(API_CHAT)
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
                <Typography variant="h2" component="h2" align="center" gutterBottom>
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
