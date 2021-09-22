import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BlogsService {
  async getBlogs() {
    return await dbContext.Blog.find()
  }

  async create(body) {
    return await dbContext.Blog.create(body)
  }

  async getUserBlogs(userId) {
    return await dbContext.Blog.find({ creatorId: userId })
  }

  async getBlogById(query) {
    return await dbContext.Blog.findById(query)
  }

  async editBlog(id, userId, body) {
    const post = await dbContext.Blog.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async deleteBlog(id, userId) {
    const post = await dbContext.Blog.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}

export const blogsService = new BlogsService()
