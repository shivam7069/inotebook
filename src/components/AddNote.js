import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        // e.preventDefault()
      addNote(note.title,note.description,note.tag)
      setNote({title:'',description:'',tag:''})
      props.showAlert("Added successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value })
    }
    return (
        
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>
                    
                    <button disabled={note.title.length < 5 || note.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
              
        </div>
    )
}

export default AddNote