import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema({
  creatorId: { type: String, ref: 'Profile', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  published: { type: Boolean, required: true, default: false },
  tags: [{ type: String, required: false }]
},
{ timestamps: true, _id: true, toJSON: { virtuals: true } })

Board.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

// NOTE: Board.pre() for cascading delete goes here

export default Board
