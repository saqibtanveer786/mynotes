import React from 'react';
import AddNote from './subcomponents/AddNote';
import Notes from './subcomponents/Notes';

export default function Home() {
  return (
    <>
      <AddNote />
      <Notes />
    </>
  );
}
