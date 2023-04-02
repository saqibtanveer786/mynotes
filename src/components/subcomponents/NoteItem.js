import React from 'react';

export default function NoteItem() {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example.</p>
          <button className="ml-4 btn btn-primary btn-sm card-link">
            Update
          </button>
          <button className="btn btn-danger btn-sm card-link">Delete</button>
        </div>
      </div>
    </>
  );
}
