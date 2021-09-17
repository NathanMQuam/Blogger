import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'
import CommentSchema from '../models/Comment'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Board = mongoose.model('Board', BoardSchema)
  List = mongoose.model('List', ListSchema)
  Task = mongoose.model('Task', TaskSchema)
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
