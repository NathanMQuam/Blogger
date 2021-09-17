import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema({
  name: { type: String, required: true },
  creatorId: { type: String, ref: 'Profile', required: true },
  description: { type: String, required: false },
  listId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }

},
{ timestamps: true, toJSON: { virtuals: true } }
)
Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Task
