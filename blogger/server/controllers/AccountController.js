import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { blogsService } from '../services/BlogsService.js'
import { commentsService } from '../services/CommentsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:id', this.getAccountById)
      .get('/:id/blogs', this.getBlogsByUserId)
      .get('/:id/comments', this.getCommentsByUserId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/blogs', this.getUserBlogs)
      .get('/comments', this.getUserComments)
      .put('/', this.editAccount)
  }

  async getCommentsByUserId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByUserId(req)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getBlogsByUserId(req, res, next) {
    try {
      const blogs = await blogsService.getBlogsByUserId(req)
      res.send(blogs)
    } catch (error) {
      next(error)
    }
  }

  async getAccountById(req, res, next) {
    try {
      const account = await accountService.getAccountById(req)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserBlogs(req, res, next) {
    try {
      const blogs = await blogsService.getUserBlogs(req.userInfo)
      res.send(blogs)
    } catch (error) {
      next(error)
    }
  }

  async getUserComments(req, res, next) {
    try {
      const comments = await commentsService.getUserComments(req.userInfo)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
