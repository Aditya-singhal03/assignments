const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://singhalbspr:Nikku12345@cluster0.tmdgnsj.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("Database connected"))
.catch((e)=>console.log(e))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
