//jshint esversion: 6
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/tododb",{useUnifiedTopology: true, useNewUrlParser: true});
const todoSchema=new mongoose.Schema({
  name: String
});
const listSchema=new mongoose.Schema({
  name: String,
  listitem: [todoSchema]
});
const item=mongoose.model("Item",todoSchema);
const list=mongoose.model("List",listSchema);
  var today = new Date();
var day = "";
var options = { weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'

};
const it1=new item({
  name: "Welcome to your to do list!"
});
const it2=new item({
  name: "Hit the + button to add an item"
});
const it3=new item({
  name: "<--Hit this to delete an item"
});
let items=[it1,it2,it3];

app.get("/", function(req, res) {
item.find({},function(err,batch){
  if (batch.length===0)
  item.insertMany(items,function(err){
    if (err)
    console.log(err);
    else
    console.log("success default");
  });
  list.find({},function(err,lists) {
    console.log(lists);
    res.render("todo", {dayof: today.toLocaleDateString("en-US",options),
    it: items ,
info: "",
allLists: lists});
  });
});
});
app.get("/:newlist",function(req,res){
  
  const customList=_.capitalize(req.params.newlist);

  list.findOne({name: customList},function(err,getter){
    if (!err) {
    if (!getter) {
      const newnn=new list({
        name: customList,
        listitem: items
      });
      newnn.save();
      
    }
}
  });
  list.find({},function(err,lists) {
    res.render("todo", {dayof: customList,
    it: items ,
info: "hidden",
allLists: lists});
  });
  
});
app.post("/delete",function(req,res){
  if (req.body.listname==today.toLocaleDateString("en-US",options)) {
  item.findByIdAndRemove(req.body.checker,function(err){});
  res.redirect("/");
} else {
  list.findOneAndUpdate({name: req.body.listname},{$pull: {listitem: {_id: req.body.checker}}},function (err,tes){
    if (!err)
    res.redirect("/"+req.body.listname);
  });
}
});

app.post("/:currentList", function(req,res){
  var addition=req.body.item;
  const newItem=new item({
    name: addition
  });
  if (req.params.currentList==today.toLocaleDateString("en-US",options)) {

  newItem.save();
  res.redirect("/");
}
else
{

list.findOne({name: req.params.currentList},function(err,goi){

  if (goi)
  {
    goi.listitem.push(newItem);
    goi.save();
  }
});

res.redirect("/"+req.params.currentList);
}
});


app.listen(333, function() {
  console.log("server started on port 333");

});
