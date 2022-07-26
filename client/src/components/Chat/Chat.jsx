import React from "react";
import Paper from "@mui/material/Paper";
import { TextInput } from "./TextInput.jsx";
import { MessageLeft, MessageRight } from "./Message";
import { Box } from "@mui/material";

// import { AuthContext } from "../../Context/AuthContext";
// import axios from 'axios';
// const API_CHATS = "http://localhost:8080/api/chat"




const Chat = () => {
  // const { user } = React.useContext(AuthContext);
  // const [ chat, setChat ] = React.useState([]);
  
  // React.useEffect(() => {
  //   axios.get(`${API_CHATS}`)
  //     .then(({data}) => {
  //       console.log(data.message);
  //       setChat(data.chat);
  //     })
  //     .catch((err) => console.log("Error getting chats", err));
  // }, [user]);

  // const texts = chat.map(m=>m.text);
  // const authors = chat.map(m=>m.author);
  
  // const texts = chat.map((message, index) => {
  //   if (message.author === user.username) {
  //     return <MessageRight key={index}>{message.text}</MessageRight>;
  //   } else {
  //     return <MessageLeft key={index}>{message.text}</MessageLeft>;
  //   }
  // }
  // );
;
  // console.log("AUTHOR", authors);
  // console.log("CHAT", chat);
  // console.log("TEXTSS", texts);

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
            message="{}"
            timestamp="MM/DD 00:00"
            photoURL="www"
            displayName=""
            avatarDisp={true}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
        </Paper>
        <TextInput />
      </Paper>
    </Box>
  );
}

export default Chat;