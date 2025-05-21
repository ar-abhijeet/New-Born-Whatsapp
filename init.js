const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

main()
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log("Error detected",err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats = [{
  from:"neha",
  to:"priya",
  msg:"Send me the notes",
  created_at: new Date(),
},
{
  from:"Harsh",
  to:"Divy",
  msg:"You are not my Friend",
  created_at: new Date(),
},
{
  from:"Abhijeet",
  to:"pp",
  msg:"Why you are not talking to harsh",
  created_at: new Date(),
},
{
  from:"pp",
  to:"aky",
  msg:"Why you can't talk to harsh",
  created_at: new Date(),
},
{
  from:"Aditya",
  to:"Bhabhi ji",
  msg:"I love you jaan",
  created_at: new Date(),
}]

Chat.insertMany(allChats)
.then((res)=>{
  console.log(res);
})