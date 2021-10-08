/* eslint-disable no-console */
import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'

class BlogsListService {
  async getBlogs() {
    try {
      AppState.blogs = {}
      const res = await api.get('api/blogs')
      AppState.blogs = res.data
      // console.log('BlogsListService\n', res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async getBlogById(id) {
    try {
      AppState.activeBlog = {}
      const res = await api.get('api/blogs/' + id)
      AppState.activeBlog = res.data
      // console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentsByBlogId(id) {
    try {
      AppState.comments = {}
      const res = await api.get(`api/blogs/${id}/comments`)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlogPost(rawBlog) {
    try {
      const res = await api.post('api/blogs', rawBlog)
      this.getBlogs()
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(rawComment) {
    try {
      // console.log(rawComment)
      const id = AppState.activeBlog.id
      const res = await api.post('api/comments', rawComment)
      this.getCommentsByBlogId(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  async editBlogPost(rawBlog) {
    const id = AppState.activeBlog.id
    await api.put('api/blogs/' + id, rawBlog)
  }

  async deleteComment(commentId) {
    try {
      const id = AppState.activeBlog.id
      await api.delete('api/comments/' + commentId)
      this.getCommentsByBlogId(id)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlogPost() {
    try {
      const id = AppState.activeBlog.id
      await api.delete('api/blogs/' + id)
      this.getBlogById(id)
    } catch (error) {

    }
  }
}

export const blogsListService = new BlogsListService()
