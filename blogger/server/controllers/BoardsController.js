import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService.js'
import BaseController from '../utils/BaseController.js'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // .get('/:id/lists', this.getListsByBoardId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getBoardById)
      .get('/', this.getUserBoards)
      .get('/:id/lists', this.getListsByBoardId)
      .post('', this.createBoard)
      .put('/:id', this.editBoard)
      .delete('/:id', this.deleteBoard)
      .get('/:id/tasks', this.getTasksByBoardId)
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getUserBoards(req, res, next) {
    try {
      return res.send(await boardsService.getUserBoards(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getBoardById(req, res, next) {
    try {
      return res.send(await boardsService.getBoardById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.editBoard(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      return res.send(await boardsService.deleteBoard(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getListsByBoardId(req, res, next) {
    try {
      return res.send(await listsService.getListsByBoardId({ boardId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getTasksByBoardId(req, res, next) {
    try {
      return res.send(await tasksService.getTasksByBoardId({ boardId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
