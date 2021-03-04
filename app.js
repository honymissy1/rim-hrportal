const express = require('express');
const mongoose = require('mongoose');
const worker = require('./model/worker');
const cors = require('cors')

const app = express();
app.use(cors())
app.listen(3008);

mongoose.connect('mongodb://localhost:27017/Rim-project', {useUnifiedTopology: true, useNewUrlParser: true})
.then(result =>{
   console.log('Success');
   
}).catch(err => console.log(err))

app.get('/', (req, res) =>{
    res.send('welcome to the server')
})

app.post('/userdata', (req, res)  =>{

  const data = new worker({
      name: req.body.name,
      role: req.body.role,
      e_mail: req.body.email,
      password: req.body.password,
  })

  data.save()
  .then(result => console.log('Saved to the database')
  ).catch(err => console.log(err))
})

app.get('/userdata', (req, res) =>{
    worker.findOne({email: req.body.email})
     .then(result => res.json(result))
     .catch(err => console.log(err))
})

app.post('/login', async(req, res) =>{
    try{
        const user = await worker.findOne({username: req.body.email});
       if(user){
         if(user.password === req.body.password){
         res.status(200).send(user)
         }else{
         res.send('wrong email/password')
     }
   }else{
       res.status(400).send('Not available')
   }
 
    }catch(err){
        console.log(err)
    }
  })

app.get('/userdata/:name', (req, res) =>{
    worker.find({name:req.params.email, password:req.params.password})
     .then(result => res.json(result))
     .catch(err => console.log(err))
})
