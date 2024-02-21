const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//setup static and middleware 
app.use(express.static(`./public`));

// app.get("/", (req, res) => {
//    res.status(200).sendFile(path.join(`${__dirname}/pages/index.html`));
// });

app.get("/about", (req, res) => {
    res.status(200).send('<h1>About</h1>');
});

app.all("*", (req, res) => {
    res.status(404).send('<h1>Page not found!</h1>');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});