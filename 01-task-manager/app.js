require('dotenv').config()
const express   = require('express');
const app       = express();
const port      = process.env.PORT || 5000;
const tasks     = require('./routes/tasks');
const dbConnect = require('./db/connect');
const notFound  = require('./middleware/not-found');

//* inbuilt middleware
app.use(express.json());
app.use('/api/v1/tasks', tasks);


//* own middleware
app.use(notFound);


//* app.post('/api/v1/tasks')       ---- create a task
//* app.get('/api/v1/tasks')        ---- get all tasks
//* app.get('/api/v1/tasks/:id')    ---- get single task
//* app.patch('/api/v1/tasks/:id')  ---- update single task
//* app.delete('/api/v1/tasks/:id') ---- delete single task
//* app.delete('/api/v1/tasks)      ---- delete all tasks




const connectionStart = async () => {
    try {
        await dbConnect(process.env.MONGO_URI);
        app.listen(port, () => { console.log(`Server listining on ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

connectionStart();