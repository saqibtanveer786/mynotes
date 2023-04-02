import React, { useContext, useEffect } from 'react';
import mynotesContext from '../../context/mynotesContext';
import NoteItem from './NoteItem';

export default function Notes() {
  const { notes, getNotes } = useContext(mynotesContext);

  useEffect(() => {
    getNotes();
    notes && console.log(notes);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4 my-2">
            <NoteItem />
          </div>
          <div className="col-4 my-2">
            <NoteItem />
          </div>
          <div className="col-4 my-2">
            <NoteItem />
          </div>
          <div className="col-4 my-2">
            <NoteItem />
          </div>
          <div className="col-4 my-2">
            <NoteItem />
          </div>
        </div>
      </div>
    </>
  );
}
