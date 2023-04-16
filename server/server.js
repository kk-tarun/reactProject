require('dotenv').config();
var express = require('express');
var cors = require('cors')

const connectDB = require('./config/db');
var app = express();
const todo = require('./routes/todo');

connectDB();
app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Server is hui hui up and running!");
})

app.use("/api/todo", todo);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
