import React, { useState } from 'react';
import mynotesContext from './mynotesContext';

export default function MynotesState(props) {
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/fetchnotes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authtoken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzJlMWY5OTI4NzZlNzYyOGFkMTIxIn0sImlhdCI6MTY3ODUzNDI1NH0.ymmSBCbMlq0eSoL6hYJW1FcEhnZPvDxsQB2kfxdTCko',
      },
    });
    const jsonData = await data.json();
    setNotes(jsonData);
  }
  return (
    <>
      <mynotesContext.Provider value={{ notes, getNotes, setNotes }}>
        {props.children}
      </mynotesContext.Provider>
    </>
  );
}
