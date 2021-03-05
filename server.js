const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

dotenv.config();

//mongodb connection string

// mongodb+srv://root:<password>@cluster0.kgfem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
        'mongodb://localhost:27017/pages',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,

    }).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log(err)
    })

    app.set('port', process.env.PORT || 3000);
  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/user' , authRoutes);
app.use('/post' , pageRoutes);

app.get('/', (req,res,next) =>{
    res.status(200).json({
        message:'Hello From Server'
    });
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})