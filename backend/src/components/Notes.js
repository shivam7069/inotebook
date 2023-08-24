import React, { useContext, useRef, useState ,useEffect} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    // getNotes();
    
      if (localStorage.getItem('token')) {
        
        getNotes()
      } else {
        navigate('/login')
        
      }
    
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }
  const handleClick = (e) => {
    // e.preventDefault()
    console.log("updating note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
    // addNote(note.title,note.description,note.tag)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>

      <AddNote showAlert={props.showAlert} />
      <div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container my-3">
                  <h2>Add a Note</h2>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">description</label>
                      <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input disabled={note.etitle.length > 5 || note.edescription.length > 5} type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />
                    </div>


                  </form>

                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "no notes to display"}
        </div>

        {notes.map(note => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}

      </div>
    </>
  )
}

export default Notes;

