const Product = require("../models/product-model");

const getProduct = async (req, res) => {

  //* http://localhost:5000/api/product -------- for getting all products
  //* http://localhost:5000/api/product?fields=company,rating --------- for getting specific fields
  //* http://localhost:5000/api/product?sort=company,-rating -------- for getting all products sort by company (asc) and rating (desc)
  //* http://localhost:5000/api/product?fields=rating,company&sort=-rating --------- combinatin of select and sort
  //* http://localhost:5000/api/product?limit=1 --- limit
  //* http://localhost:5000/api/product?skip=2 --- skip (offset)
  //* http://localhost:5000/api/product?fields=rating,company&sort=-rating&skip=1&limit=5  ----- select,sort,skip(offset),limit

  try {
    const { fields, sort, limit, skip } = req.query;
    //console.log(fields);return

    let result = Product.find({});

    if( fields ){
       const selectFields = fields.split(',').join(' ');
       result = result.select( selectFields );
    }
    
    if( sort ){
       const sortFields = sort.split(',').join(' ');
       result = result.sort(sortFields);
    }

    if( limit )
      result = result.limit(limit);
    

    if( skip )
      result = result.skip(skip);
    
    

    const products = await result;
    
    products.length
      ? res.status(200).send({
          status: 1,
          msg: "Products list",
          data: products,
          nbHits: products.length,
        })
      : res.status(401).send({ status: 0, msg: "No product found" });
  } catch (error) {
    res.status(404).send({ status: 0, msg: error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, company } = req.body;
    if (name.length != "" && price != "" && company != "") {
      const product = await Product.create({ name, price, company });
      product
        ? res.status(201).send({ status: 1, msg: "product created" })
        : res.status(401).send({ status: 0, msg: "product not created" });
    } else res.status(401).send({ status: 0, msg: "All fields are required" });
  } catch (error) {
    res.status(404).send({ status: 0, msg: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, company } = req.body;
    const _id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      { _id },
      { name, price, company },
      { new: true, runValidators: true }
    );
    product
      ? res
          .status(200)
          .send({ status: 1, msg: "product updated", data: product })
      : res.status(401).send({ status: 0, msg: "product not updated" });
  } catch (error) {
    res.status(404).send({ status: 0, msg: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id });
    product
      ? res.status(200).send({ status: 1, msg: "product deleted" })
      : res
          .status(401)
          .send({ status: 0, msg: "product not delete for this id" });
  } catch (error) {
    res.status(404).send({ status: 0, msg: error });
  }
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };
