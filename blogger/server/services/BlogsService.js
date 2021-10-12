import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

function sanitizeBody(body) {
  const writable = {
    creatorId: body.creatorId,
    title: body.title,
    body: body.body,
    tags: body.tags,
    published: body.published
  }
  return writable
}

class BlogsService {
  async getBlogs() {
    const blogs = await dbContext.Blog.find({ published: true }).populate('creator')
    return blogs
  }

  async create(body) {
    const newBlog = sanitizeBody(body)
    return await dbContext.Blog.create(newBlog)
  }

  async getUserBlogs(userId) {
    return await dbContext.Blog.find({ creatorId: userId }).populate('creator')
  }

  async getBlogById(query) {
    return await dbContext.Blog.findById(query).populate('creator')
  }

  async editBlog(id, userId, body) {
    const sanitizedBlog = sanitizeBody(body)
    const post = await dbContext.Blog.findOneAndUpdate({ _id: id, creatorId: userId }, sanitizedBlog, { new: true }).populate('creatorId')
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
    return post
  }

  async deleteBlog(id, userId) {
    const post = await dbContext.Blog.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}

export const blogsService = new BlogsService()
