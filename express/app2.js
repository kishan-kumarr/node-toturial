const express = require("express");
const app = express();
const port = process.env.PORT | 5000;
const products = require('./api/data');


app.get("/", (req, res) => {
   res.send("Welcom to products <a href='/api/products'>product list</a>");
});

//* Middleware
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const date = new Date().getFullYear();
    console.log(`${method}, ${url}, ${date}`);
    next();
}

app.get('/middleware', logger, (req, res) => {
    res.send('Middleware');
})


app.get("/api/products", (req, res) => {
    const newProduct = products.map( (product) => { 
        const {id, title} = product;
        return  {id, title};
   });
   res.json(newProduct);
});


app.get("/api/products/:id", (req, res) => {
    const {id} = req.params;
    const singleProduct = products.find( (product) => product.id === Number(id) );

    console.log(id)

    if(singleProduct)
        res.json(singleProduct);
    else
        res.json({'status': 404, 'msg': 'Data not found'});
})




app.listen( port, () => {
    console.log(`server listening on ${port}`);
} );