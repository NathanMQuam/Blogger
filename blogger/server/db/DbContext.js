import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import BlogSchema from '../models/Blog'
import CommentSchema from '../models/Comment'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Blog = mongoose.model('Blog', BlogSchema)
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
