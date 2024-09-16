require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const DataBaseConnection = require('./db');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const todoRoutes = require('./routes/add-todo');
const getTodoRoutes = require('./routes/get-todo');
const deleteTodoRoutes = require('./routes/delete-todo');
const bodyParser = require('body-parser');


//Database connection

DataBaseConnection();
//middlewares
app.use(bodyParser.json());

// app.use(express.json());
app.use(cors());

// 

app.use("/api",userRoutes);
app.use("/api", authRoutes);
app.use("/api", todoRoutes);
app.use("/api", getTodoRoutes);
app.use("/api", deleteTodoRoutes);

const port = process.env.PORT || 5700;

app.listen(port, ()=>{
    console.log(`Listening on PORT ${port}`)
});