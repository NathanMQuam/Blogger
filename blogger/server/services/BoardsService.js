import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BoardsService {
  async create(body) {
    return await dbContext.Blog.create(body)
  }

  async getUserBoards(userId) {
    return await dbContext.Blog.find({ creatorId: userId })
  }

  async getBoardById(query) {
    return await dbContext.Blog.findById(query)
  }

  async editBoard(id, userId, body) {
    const post = await dbContext.Blog.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async deleteBoard(id, userId) {
    const post = await dbContext.Blog.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}

export const boardsService = new BoardsService()
