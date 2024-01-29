const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const DataModel = require("./DataModel");
const connectDB = require("./DBConnection");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
app.use(cors());

app.get("/readfromserver", (req, res) => {
  res.json({ message: "From server" });
});

app.post("/writetodatabase", async (req, res) => {
  try {
    const { content } = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({ message: "Data saved succesfully" });
  } catch {
    res.status(500).send("server error while saving data");
  }
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("codeChange", ({ codeIndex, newCode }) => {
    console.log(`Code block ${codeIndex} updated with new code: ${newCode}`);

    socket.broadcast.emit("codeChange", { codeIndex, newCode });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
