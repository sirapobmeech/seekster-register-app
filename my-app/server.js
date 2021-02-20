const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Demo database
let user = [];
//--------------

// middleware
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
//--------------

app.post('/auth',(req, res) => {
  let email = req.body.email;
  let password = Buffer.from(req.body.password).toString('base64')
  if (email && password) {
    const userIndex = user.findIndex((element) => {
      return element.email === email && element.password === password;
    });
    if (userIndex !== -1) {
      res.send({ status: "success", user: email,token : crypto.randomBytes(48).toString('hex')});
    }
    else {
      return res.status(404).send({
        message: 'Incorrect email or password'
     });
    }

  } else {
    res.send('Please correct email and password.');
  }

})

app.post("/userRegister", (req, res) => {
  if (req.body.email && req.body.password && req.body.name && req.body.lastName) {
      let {email, password, name, lastName} = req.body;
      req.body.password = Buffer.from(req.body.password).toString('base64')
      if(validateEmail(email)){
        const userIndex = user.findIndex((element) => {
          return element.email === email
        });
        if(userIndex === -1){
          user.push(req.body)
          res.send({status : "success"})
        }
        else{
          return res.status(404).send({
            message: 'Email already exists.'
      
         });
         
        }
        
      }
      else{
        return res.status(404).send({
          message: 'Incorrect email type'
       });
      }
  }
  else {
    return res.status(404).send({
      message: 'Input must not be empty'
   });
  }
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})