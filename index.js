const express = require('express')
const app = express()
const port = 5000

const {User} = require("./server/models/User");
const bodyParser = require("body-parser");

const config = require("./server/config/key");

//application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: true}));
//aplication/json
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongDB Connected..."))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 a')
})

app.post("/register", (req, res) => {
  //회원가입시 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다
  const user = new User(req.body)

  user.save((err, userInfo) =>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})