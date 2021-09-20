import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createComment)
      .put('/:id', this.editComment)
      .delete('/:id', this.deleteComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await commentsService.createComment(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      return res.send(await commentsService.deleteComment(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await commentsService.editComment(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
