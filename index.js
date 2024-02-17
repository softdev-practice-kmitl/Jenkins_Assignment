const express = require("express")
const app = express()

const plusHandler = (req, res) => {
    const result = parseInt(req.params.num1) + parseInt(req.params.num2);
    res.json(result);
};

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/kuy", (req, res) => res.send("kuyyyy"))
app.get("/getcode", (req, res) => res.send("Oot the most handsome person in the universe!!!"))
app.get("/plus/:num1/:num2",plusHandler)
app.listen(3001, () => console.log("Example app listening on port 3001!"))

module.exports = {
    plusHandler
    
}
