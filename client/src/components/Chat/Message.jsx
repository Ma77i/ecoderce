import React from "react";
// import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";



const Message = ({ messageContent }) => {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      {messageContent.map((message) => (
        <Box
          sx={{
            display: "flex",
            padding: "5px",
            ...(message.author === user.userName && {
              justifyContent: "flex-end",
            }),
            ...(message.author !== user.userName && {
              justifyContent: "flex-start"
            }),
          }}
        >
          <Box
            sx={{
              ...(message.author === user.userName && {
                backgroundColor: "transparent",
              }),
              ...(message.author !== user.userName && {
                backgroundColor: "#34B7F1"
              }),
              position: "relative",
              // margin: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              padding: "12px",
              width: "60%",
              //height: "50px",
              font: "400 .9em 'Open Sans', sans-serif",
              borderRadius: "10px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",  
              overflowWrap: "break-word",
            }}
          >
            <Typography
              sx={{
                padding: 0,
                margin: 0
              }}
            >
              {message.text}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                fontSize: ".85em",
                fontWeight: "600",
                padding: "10px",
                marginTop: "10px",
                bottom: "-3px",
                right: "5px"
              }}
            >
              {message.date}, {message.author}
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Message;
