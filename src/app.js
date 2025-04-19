const express = require('express');
const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "Anshika", lastName: "Goel"});
});

app.post("/user", (req, res) => {
    res.send("Data saved successfully to database...");
});

app.delete("/user", (req, res) => {
    res.send("Deleted...");
})

app.use("/test", (req, res) => {
    res.send("Hello from server");
});

app.listen(7777, () => {
    console.log("Server is successfully running on port 7777...");
});