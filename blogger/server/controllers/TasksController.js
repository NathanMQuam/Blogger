import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createTask)
      .delete('/:id', this.deleteTask)
      .get('/:id/comments', this.getCommentsByTaskId)
      .put('/:id', this.editTask)
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      return res.send(await tasksService.deleteTask(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      return res.send(await commentsService.getCommentsByTaskId({ taskId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await tasksService.editTask(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
