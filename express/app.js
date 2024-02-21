const { urlencoded } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
let people  = require('./json-crud/data');
const route = require('./routes/router');

//app.use(express.static(`./json-crud`));
app.use(express.urlencoded({extended: false}));
app.use('/api/route', route);

// app.get('/api/people', (req, res) => {
//     res.status(200).send({'success':true, 'data': people});
// });

// app.post('/add', (req, res) => {
//     const { fname } = req.body;
//     if(fname)
//     {   
//         people.push({name: fname, id: 6});
//         res.status(200).send({'success':true, 'data': people, 'msg' : 'name is added'});
//     }
//     else
//     {
//         people.push({name: fname, id: 6});
//         res.status(401).send({'success':false, 'data': [], 'msg' : 'name field is required'});
//     }
// });



app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});