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
    const blog = await dbContext.Blog.findById(body.blogId)
    // @ts-ignore
    if (blog.published || blog.creatorId === body.creatorId) {
      const comment = await dbContext.Comment.create(body)
      return comment
    } else {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async getCommentsByBlogId(id) {
    return await dbContext.Comment.find({ blogId: id }).populate('creator')
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
    return post
  }
}

export const commentsService = new CommentsService()
