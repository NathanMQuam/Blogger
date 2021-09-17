import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService.js'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
      .get('/:id/tasks', this.getTasksByListId)
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listsService.editList(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      return res.send(await listsService.deleteList(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      return res.send(await tasksService.getTasksByListId({ listId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
