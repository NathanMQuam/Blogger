import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { blogsService } from '../services/BlogsService.js'
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

  getCommentsByUserId(req, res, next) {
    throw new Error('Method not implemented.')
  }

  getBlogsByUserId(req, res, next) {
    throw new Error('Method not implemented.')
  }

  getAccountById(req, res, next) {
    throw new Error('Method not implemented.')
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
      console.log(await blogsService.getBlogsByUserId())
    } catch (error) {
      next(error)
    }
  }

  async getUserComments(req, res, next) {
    try {
      //
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      //
    } catch (error) {
      next(error)
    }
  }
}
