
const socket = io();
const btn = document.getElementById("btn");
const inputMsj = document.getElementById("mensaje");
const inputName = document.getElementById("nombre");
const form = document.getElementById("formulario");


// Lectura y renderizado del chat
const addMsj = (e) => {
  e.preventDefault();

  if (!inputMsj.value || !inputName.value) {
    return;
  }

  const chat = {
    author: {
      userName: inputName.value,
    },
    date: new Date(Date.now()).getHours() +
    ":" +
    new Date(Date.now()).getMinutes(),
    text: inputMsj.value,
  };
  console.log("Guardado del navegador: F:", chat);

  socket.emit("newMessage", chat);

  form.reset();
  return false;
};

//escucho el evento de los datos del mensaje
btn.addEventListener("click", addMsj);

//renderizo el chat
const renderChat = (chat) => {
  console.log("Renderizado del navegador: F:", chat);
  const room = chat
    .map(
      (e) =>
        `<p><strong>-${e.author.userName} </strong>${e.date}<em class="bubble">: ${e.text}</em></p>`
    )
    .join(" ");
  document.getElementById("room").innerHTML = room;
};

socket.on("msjs", (data) => renderChat(data));






// socket.on("msNorm", (data) => {
//   const author = new normalizr.schema.Entity("authors", {}, { idAttribute: "mail" });
//   const chat = new normalizr.schema.Entity("chats", {
//     author: author,
//   });

//   const msjSchema = new normalizr.schema.Entity("data", {
//     text: [chat],
//   });

//   const denormalizedData = normalizr.denormalize("chats", msjSchema, data.entities);
//   console.log(denormalizedData);
//   //console.log("Normalizado Front:__", JSON.stringify(data));

//   renderChat(denormalizedData.mensajes)
// //   denormalzedData.mensajes.forEach(m => renderDenorm(m))
// });
