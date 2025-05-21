const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

app.get("/",(req,res)=>{
  res.send("Root is working!");
})

// Index root
app.get("/chat",async(req,res)=>{
  let chats = await Chat.find();
  res.render("index.ejs",{chats});
})

//New chat route
app.get("/chat/new",(req,res)=>{
  res.render("new.ejs");
})

//Edit route
app.get("/chat/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
})

//Update route
app.put("/chat/:id",async(req,res)=>{
  let {id} = req.params;
  let {msg:newmsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    {msg:newmsg},
    {runValidators:true, new:true},
  );
  console.log(updatedChat);
  res.redirect("/chat");
})

//Destroy Route

app.delete("/chat/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chat");
})

app.post("/chat",(req,res)=>{
  let {from,msg,to} = req.body;
  let newChat = new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at:new Date(),
  });
  newChat.save()
  .then((res)=>{
    console.log("Chat was saved");
  })
  .catch((err)=>{
    console.log("Error detected",err);
  })
  res.redirect("/chat");
})

app.listen(8080,()=>{
  console.log("Server is running on port 8080");
})