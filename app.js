// const express = require("express")
// const mongoose = require("mongoose")

// const app = express()

// const PORT = process.env.PORT || 3000
// const APP_NAME = process.env.APP_NAME || "My Node.Js App"
// const ENVIRONMENT = process.env.ENVIRONMENT || "development"
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/my-app"

// mongoose.connect(MONGODB_URI).then(() => {
//     console.log("Connected to MongoDB")

//     app.listen(PORT, () => {
//         console.log(`${APP_NAME} is running on port ${PORT} in ${ENVIRONMENT} mode`)
//     })
// }).catch(err => {
//     console.log("Error connecting to MongoDB", err)
//     process.exit(1)
// })

// const messageSchema = new mongoose.Schema({
//     text: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// })

// const Message = mongoose.model("Message", messageSchema)

// app.use(express.json())

// app.get("/",(req,res) => {
//     res.json({
//         message: `Hello from ${APP_NAME}`,
//         environment: ENVIRONMENT,
//         timestamp: new Date().toISOString(),
//         hostname: require("os").hostname()
//     })
// })

// app.get("/health", (req,res) => {
//     try {
//     const dbStatus = mongoose.connection.isReady == "1" ? "connected" : "not connected"
//     res.json({status: "healthy"})
//     } catch (err) {
//         res.status(503).json({status: "unhealthy"})
//     }
// })

// app.post("/message", async (req,res) => {
//     try {
//         console.log("Recieved Data")
//         const msg = await Message.create(req.body)
//         console.log("Saved Data")
//         res.json(msg)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// })

// app.get("/messages", async (req,res) => {
//     try {
//         const messages = await Message.find()
//         res.json(messages)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// })


// app.listen(PORT, () => {
//     console.log(`${APP_NAME} is running on port ${PORT} ${ENVIRONMENT} mode`)
// })





// app.js
const express = require("express");
const os = require("os");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My Node.Js App";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

// Simple in-memory storage
const messages = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: `Hello from ${APP_NAME}`,
        environment: ENVIRONMENT,
        timestamp: expect.any(String),
        hostname: os.hostname()
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.post("/message", (req, res) => {
    try {
        const msg = {
            id: messages.length + 1,
            text: req.body.text,
            createdAt: new Date()
        };

        messages.push(msg);

        console.log("Message saved:", msg);

        res.status(201).json(msg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

app.get("/version", (req, res) => {
    res.json({
        version: "v1"
    })
})

module.exports = app;