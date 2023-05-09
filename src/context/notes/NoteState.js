import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1M2VjMTNiNjBlYzkwNmQwODQ4ZmVjIn0sImlhdCI6MTY4MzIyMTUyM30.Ys2WaGb9tWg-8ViHrwTtocw-JqVoEOoN4jpUSP9Ur_c",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    console.log("Adding a new note");
    const note = {
      _id: "6455c77122a4a838575272917",
      user: "6453ec13b60ec906d0848fec",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-06T03:20:17.015Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1M2VjMTNiNjBlYzkwNmQwODQ4ZmVjIn0sImlhdCI6MTY4MzIyMTUyM30.Ys2WaGb9tWg-8ViHrwTtocw-JqVoEOoN4jpUSP9Ur_c",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1M2VjMTNiNjBlYzkwNmQwODQ4ZmVjIn0sImlhdCI6MTY4MzIyMTUyM30.Ys2WaGb9tWg-8ViHrwTtocw-JqVoEOoN4jpUSP9Ur_c",
      },
    });
    const json = response.json;
    console.log(json);
    console.log("Deleting the note with Id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1M2VjMTNiNjBlYzkwNmQwODQ4ZmVjIn0sImlhdCI6MTY4MzIyMTUyM30.Ys2WaGb9tWg-8ViHrwTtocw-JqVoEOoN4jpUSP9Ur_c",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
