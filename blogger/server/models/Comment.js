import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Comment = new Schema({
  name: { type: String, required: true },
  creatorId: { type: String, ref: 'Profile', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Comment
