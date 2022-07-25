import React from "react";
import Paper from "@mui/material/Paper";
import { TextInput } from "./TextInput.jsx";
import { MessageLeft, MessageRight } from "./Message";
import { Box } from "@mui/material";

import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
const API_CHATS = "http://localhost:8080/api/chat"




const Chat = () => {
  const { user } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  
  console.log("User", user);

  React.useEffect(() => {
    axios.get(`${API_CHATS}`)
      .then(({data}) => {
        console.log(data.message);
        console.log("Author: ", data.chat.author);
        const text = data.chat.map(m => console.log(m.author.mail === user.email) );
        console.log("TEXT: ", text);
        // setMessages(text);
        setMessages(data.chat);
      })
      .catch((err) => console.log("Error getting chats", err));
  }, [user]);

  console.log(messages);


  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Paper sx={{
        width: "80vw",
        height: "80vh",
        maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative"
      }} >
        <Paper 
          sx={{
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
          }}
          id="style-1">
          <MessageLeft
            message="Hola"
            timestamp="MM/DD 00:00"
            photoURL="www"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message="alo"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="テスト"
            avatarDisp={false}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
        </Paper>
        <TextInput />
      </Paper>
    </Box>
  );
}

export default Chat;