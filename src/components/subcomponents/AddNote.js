import React from 'react';

export default function AddNote() {
  return (
    <>
      <form className="my-5">
        <div className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>

            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Description"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
