const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Notes = require('../modals/Notes');
const mongoose = require('mongoose');
const fetchid = require('../middleware/fetchid');
const { update } = require('../modals/Users');

//Route 1 : For adding a note. Login required
router.post(
  '/addnote',
  fetchid,
  body('title').exists().isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
  body('tag').isLength({ min: 3 }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      let note = await new Notes({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      await note.save();
      res.send({ note: note });
    } catch (error) {
      res.json(error);
    }
  }
);

//Route 2 : For fetching all notes. Login required
router.get('/fetchnotes', fetchid, async (req, res) => {
  const allnotes = await Notes.find({ user: req.user.id });
  res.json(allnotes);
});

//Route 3 : For deleting a note. Login required
router.delete('/deletenote', fetchid, async (req, res) => {
  const note = await Notes.findByIdAndDelete(req.headers.id);
  if (note) {
    res.send({ Sucess: 'Deleted' });
  }
});

//Route 4 : For updating a note. Login required

router.put('/updatenote', fetchid, async (req, res) => {
  try {
    const { id, title, description, tag } = req.body;
    let updatednote = {};
    if (title) {
      updatednote.title = title;
    }
    if (description) {
      updatednote.description = description;
    }
    if (tag) {
      updatednote.tag = tag;
    }
    const note = await Notes.findByIdAndUpdate(
      id,
      { $set: updatednote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
