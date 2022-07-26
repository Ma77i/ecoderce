import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

console.log("SOCKET", socket);



export const MessageLeft = (props) => {
  // const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "User Name";
  
  const [message, setMessage] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);
  
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // true
      setIsConnected(true);
      console.log('connected');
    });
    
    socket.on("disconnect", () => {
      console.log(socket.connected); // false
      setIsConnected(false);
    });

    socket.on("msjs", (data) => {
      console.log("MSJS", data);
      setMessage(data);
    });
  }, []);

  console.log("MESSAGE", message);

  return (
    <>
      <Box
        sx={{
          display: "flex"
        }}
      >
        <Avatar alt={displayName} src={photoURL}></Avatar>
        <Box>
          <Box
            sx={{
              marginLeft: "20px"
            }}
          >
            {isConnected ? ( <Typography variant="body1">{message}</Typography> ) : ( <Typography variant="body1">Disconnected</Typography> )}
          </Box>
          <Box
            sx={{
              position: "relative",
              marginLeft: "20px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#A8DDFD",
              width: "60%",
              //height: "50px",
              textAlign: "left",
              font: "400 .9em 'Open Sans', sans-serif",
              border: "1px solid #97C6E3",
              borderRadius: "10px",
              "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #A8DDFD",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px"
              },
              "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px"
              }
            }}
          >
            <Box>
              <Typography
                variant="text"
                component="p"
                sx={{
                  padding: 0,
                  margin: 0
                }}
              >
                {message}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                fontSize: ".85em",
                fontWeight: "300",
                marginTop: "10px",
                bottom: "-3px",
                right: "5px"
              }}
            >
              {timestamp}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginRight: "20px",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#f8e896",
          width: "60%",
          //height: "50px",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: "1px solid #dfd087",
          borderRadius: "10px",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "15px solid #f8e896",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px"
          },
          "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "17px solid #dfd087",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px"
          }
        }}
      >
        <Typography
          sx={{
            padding: 0,
            margin: 0
          }}
        >
          {message}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            fontSize: ".85em",
            fontWeight: "300",
            marginTop: "10px",
            bottom: "-3px",
            right: "5px"
          }}
        >
          {timestamp}
        </Box>
      </Box>
    </Box>
  );
};
