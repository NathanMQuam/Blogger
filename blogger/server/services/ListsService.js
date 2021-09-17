import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async createList(body) {
    return await dbContext.List.create(body)
  }

  async getListsByBoardId(id) {
    return await dbContext.List.find(id).populate('boardId', 'name')
  }

  async editList(id, userId, body) {
    const post = await dbContext.List.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async deleteList(id, userId) {
    const post = await dbContext.List.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}
export const listsService = new ListsService()
