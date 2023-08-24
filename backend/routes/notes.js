const express = require('express')
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
  try{
   const notes = await Notes.find({user:req.user.id})
   res.json(notes)
  }catch(error){
    console.error(error.message);
         res.status(500).send("internal error")
  }
})
router.post('/addnote', fetchuser, [
  body('title','Enter a valid title').isLength({ min: 3 }),
  body('description','description must be atleast 5 character').isLength({ min: 5 })],async(req,res)=>{
  try{
  const {title,description,tag} = req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await Notes({
         title,description,tag,user:req.user.id
      })
     const savedNotes = await note.save()
        res.json(savedNotes)
    }catch(error){
      console.error(error.message);
      res.status(500).send("internal error")
    }
})

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  try{
  const{title,description,tag}=req.body;
  const newNote ={}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}

  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(404).send("not Allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note})
}catch(error){
    console.error(error.message);
    res.status(500).send("internalupdate error")
  }
})
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  
try{  

  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(404).send("not Allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"success":"Note has been deleted", note:note})
  }catch(error){
    console.error(error.message);
    res.status(500).send("internal error")
  }
})

module.exports = router 
