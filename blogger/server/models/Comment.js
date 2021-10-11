import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Comment = new Schema({
  body: { type: String, required: true, default: 'COMMENT BODY MISSING' },
  creatorId: { type: String, ref: 'Account', required: true },
  blogId: { type: ObjectId, ref: 'Blogs', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
