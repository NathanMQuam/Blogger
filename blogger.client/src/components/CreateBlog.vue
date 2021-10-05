<template>
  <div class="createBlog" v-if="state.user">
    <form v-if="state.user.isAuthenticated" class="text-left" @submit.prevent="createBlogPost">
      <div class="form-group">
        <input type="text"
               name="blogTitle"
               placeholder="Title of new Blog Post"
               v-model="state.newBlog.title"
               maxlength="64"
               required
        >
      </div>
      <div class="form-group">
        <textarea name="blogBody" v-model="state.newBlog.body" rows="3" cols="50" required>
          Body of new blog post
        </textarea>
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { blogsListService } from '../services/BlogsListService'
export default {
  name: 'CreateBlog',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      newBlog: {}
    })
    return {
      state,
      async createBlogPost() {
        try {
          const blogId = await blogsListService.createBlogPost(state.newBlog)
          router.push({ name: 'BlogPage', params: { id: blogId } })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>
