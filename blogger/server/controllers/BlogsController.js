import { Auth0Provider } from '@bcwdev/auth0provider'
import { blogsService } from '../services/BlogsService.js'
import { commentsService } from '../services/CommentsService.js'
import BaseController from '../utils/BaseController.js'

export class BlogsController extends BaseController {
  constructor() {
    super('api/blogs')
    this.router
      .get('/', this.getBlogs)
      .get('/:id', this.getBlogById)
      .get('/:id/comments', this.getCommentsByBlogId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBlog)
      .put('/:id', this.editBlog)
      .delete('/:id', this.deleteBlog)
  }

  async getCommentsByBlogId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByBlogId(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createBlog(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await blogsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getBlogs(req, res, next) {
    try {
      const blogs = await blogsService.getBlogs()
      return res.send(blogs)
    } catch (error) {
      next(error)
    }
  }

  async getBlogById(req, res, next) {
    try {
      const blog = await blogsService.getBlogById(req.params.id)
      return res.send(blog)
    } catch (error) {
      next(error)
    }
  }

  async editBlog(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await blogsService.editBlog(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBlog(req, res, next) {
    try {
      return res.send(await blogsService.deleteBlog(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
