import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsByUserId(userId) {
    return await dbContext.Comment.find({ creatorId: userId })
  }

  async getUserComments(userInfo) {
    return await dbContext.Comment.find({ creatorId: userInfo })
  }

  async createComment(body) {
    return await dbContext.Comment.create(body)
  }

  async getCommentsByBlogId(id) {
    return await dbContext.Comment.find(id).populate('listId', 'name')
  }

  async deleteComment(id, userId) {
    const post = await dbContext.Comment.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async editComment(id, userId, body) {
    const post = await dbContext.Comment.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}

export const commentsService = new CommentsService()
