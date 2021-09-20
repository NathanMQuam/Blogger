import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService.js'
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

  getCommentsByBlogId(arg0, getCommentsByBlogId) {
    throw new Error('Method not implemented.')
  }

  async createBlog(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getBlogs(req, res, next) {
    try {
      return res.send(await boardsService.getUserBoards(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getBlogById(req, res, next) {
    try {
      return res.send(await boardsService.getBoardById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editBlog(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.editBoard(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBlog(req, res, next) {
    try {
      return res.send(await boardsService.deleteBoard(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
