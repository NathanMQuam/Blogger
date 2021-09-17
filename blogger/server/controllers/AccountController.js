import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { boardsService } from '../services/BoardsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/boards', this.getUserBoards)
      .get('/comments', this.getUserComments)
      .put('/', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserBoards(req, res, next) {
    try {
      console.log(await boardsService.getBoardsByUserId())
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
