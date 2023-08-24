import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  //get notes
  const getNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkN2I3Mjg2YjFlMWJkOTliZDQzNWI5In0sImlhdCI6MTY5MTg1ODcyOH0.6Mk2V4ePkq6XJdWicx0tkDn3jvsN4IZJcvLFMlOajl4"
        
      },
      
    });
    const json = await response.json()
   
    setNotes(json)
    
  }
  // Add Notes
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
         //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkN2I3Mjg2YjFlMWJkOTliZDQzNWI5In0sImlhdCI6MTY5MTg1ODcyOH0.6Mk2V4ePkq6XJdWicx0tkDn3jvsN4IZJcvLFMlOajl4"
        
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    
    setNotes(notes.concat(note))
  }

// delete notes
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
         //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkN2I3Mjg2YjFlMWJkOTliZDQzNWI5In0sImlhdCI6MTY5MTg1ODcyOH0.6Mk2V4ePkq6XJdWicx0tkDn3jvsN4IZJcvLFMlOajl4"
        
      },
      
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((element)=>{return element._id !== id})
    setNotes(newNotes)
   
  }
  //edit notes
  const editNote= async(id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token') 
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkN2I3Mjg2YjFlMWJkOTliZDQzNWI5In0sImlhdCI6MTY5MTg1ODcyOH0.6Mk2V4ePkq6XJdWicx0tkDn3jvsN4IZJcvLFMlOajl4"     
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json)
   
  
    const newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
      
    } setNotes(newNotes)

  }
  
  return (
    <NoteContext.Provider value={{ notes, setNotes,getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}



export default NoteState;
