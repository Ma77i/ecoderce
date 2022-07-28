const express = require("express");
const app = express();

const config = require("./config");

const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

// gzip compression
const compression = require("compression");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// mongoose, mongoStore
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// passport
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passport/local");

// models
const chatModel = require("./models/chatModel");

// controllers
const chatController = require("./controllers/chat.controller");

// logger
const logger = require("./log");

// initialize Passport
initializePassport(passport);

// mongo configurations
const { mongoConfig } = require("./config");

const { HOSTNAME, SCHEMA, OPTIONS, DATABASE, USER, PASSWORD } = mongoConfig;

// websocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// swagger doc
const swaggerMiddleware = require("./middlewares/swagger.middleware");

// template handlebars
const templateEngine = require("./engine");

swaggerMiddleware(app);

templateEngine(app);

// import routers
const adminRouter = require("./routes/admin.routes");
const cartRouter = require("./routes/api.cart.routes");
const chatRouter = require("./routes/api.chat.routes");
const productRouter = require("./routes/api.products.routes");
const orderRouter = require("./routes/api.orders.routes");
const signRouter = require("./routes/api.sign.routes");
const userRouter = require("./routes/api.user.routes");
const homeRouter = require("./routes/home.routes");


// CORS
// const corsCallback = (req, cb) => {
//   const origin = req.header('Origin')
//   const allowedHosts = ['http://localhost:3000', 'http://localhost:8080', 'https://ecoderce.herokuapp.com']

//   if (allowedHosts.includes(origin)) {
//     cb(null, { origin: true })
//   } else {
//     cb(null, { origin: true })
//   }
// }

app.use(cors());
// app.use(cors(corsCallback));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HANDLEBARS
app.use("/static", express.static(path.join(__dirname, "../public")));

// REACT
if (process.env.NODE_ENV === "production") {
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../client/build")))
}

app.use(flash());
app.use(cookieParser(config.SECRET));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,

    store: new MongoStore({
      mongoUrl: `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`,
      ttl: 10 * 60,
      expire: 1000 * 1 * 60,
      autoRemove: "native"
    })
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

app.use("/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/chat", chatRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sign", signRouter);
app.use("/api/users", userRouter);
app.use("/", homeRouter);

// Socket connection
io.on("connection", async (socket) => {
  // logger.info(`User ${socket.id} connected`);

  // const chats = await chatModel.find();
  // socket.emit("messages", chats); 
  // io.sockets.emit("msjs", msjs);

  socket.on("join_chat", (data) => {
    socket.join(data);
    logger.info(`User ${data} joined the chat`)
  })
  
  socket.on("newMessage", async (data) => {
    await chatModel.create(data);
    io.sockets.emit("messages", data);
    logger.info(`New message received`);
  });

  socket.on("disconnect", () => {
    logger.info(`User ${socket.id} disconnected`);
  });

  // obtengo los mensajes normalizados
  // const norm = await chatController.getNorm;
  // socket.emit("msNorm", norm);
});

// Mongoose connection
mongoose
  .connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`)
  .then(() => {
    logger.info("Connected to mongoose");
  })
  .catch((err) => logger.info("Error on mongo: ", err));

  server.listen(process.env.PORT, () => {
    logger.info(`Server listening on http://localhost:${process.env.PORT}`);
  });
server.on("err", (err) => logger.info(`Error: ${err}`))

module.exports = server;
