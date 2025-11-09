// Imports & Setup
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const path = require('path');  
const methodOverride = require("method-override");
const ExpressError = require('./ExpressError.js');

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");  

// Middleware
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Database Connection
main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log(err);
});

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ChattingApp');
// }

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeChattingApp');
}

// Read (Display all chats)
app.get("/chats", asyncWrap(async (req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
}));

// Create Page (Form for new chat)
app.get("/chats/new", (req,res) => {  
  // throw new ExpressError(404 , "Page Not Found");
  res.render("new.ejs");
});

// Create (Save new chat)

// app.post("/chats",(req,res)=>{
//   let {from,to,msg} = req.body;
//     let newChat = new Chat({
//       from:from,
//       to:to,
//       msg:msg,
//       created_at: new Date(),
//     });

//     newChat.save()
//       .then(() => {
//         console.log('Chat saved successfully!');
//         res.redirect("/chats");
//       })
//       .catch(err => {
//         console.log(err);
//         res.redirect("/chats");
//       });
// });


//wrapAsync function to handle errors
function asyncWrap(fn){
  return function(req,res,next){
    fn(req,res,next).catch((err) => next(err));
  };
}

// Create (Save new chat)
app.post("/chats",asyncWrap(async(req,res,next)=>{
      let {from,to,msg} = req.body;
        let newChat = new Chat({
            from:from,
            to:to,
            msg:msg,
            created_at: new Date(),
        });
      await newChat.save();
      res.redirect("/chats");
}));

// Show handaling Async Errors
app.get("/chats/:id", asyncWrap(async (req,res,next) => {
      let {id} = req.params;
      let chat = await Chat.findById(id);
      if(!chat){
        // throw new ExpressError(404 , "Chat Not Found"); for async functions we can't use throw
        next(new ExpressError(404 , "Chat Not Found")); 
      }
      res.render("show.ejs" , {chat});
}));

// Edit Page (Form for editing chat)
app.get('/chats/:id/edit',asyncWrap(async (req, res) => {
      let {id} = req.params;
      let chat = await Chat.findById(id);
      res.render('edit.ejs' ,{chat});
}));

// Update (Modify existing chat)
app.put("/chats/:id", asyncWrap(async (req,res)=>{
  let {id} = req.params;
  let {msg:newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id,{msg : newMsg} , {runValidators:true , new:true})
  console.log(updatedChat);
  res.redirect("/chats");
}));

// Delete (Remove chat)
app.delete("/chats/:id", asyncWrap(async(req,res)=>{

  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
}));



//Error Handling Middleware
app.use((err,req,res,next) => {
  let {status = 500 , message = 'Something went wrong!'} = err;
  res.status(status).send(message);  
});

// Server Start
app.listen(8080, () => {
  console.log('Running on http://localhost:8080/chats');
});
