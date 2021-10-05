<template>
  <div class="CreateComment" v-if="state.user">
    <p>Comment:</p>
    <form v-if="state.user.isAuthenticated" class="text-left" @submit.prevent="createComment">
      <div class="form-group">
        <textarea name="commentBody" v-model="state.newComment.body" rows="3" cols="50" required>
          Body of new comment
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
import { blogsListService } from '../services/BlogsListService'
import { AppState } from '../AppState'
export default {
  name: 'CreateComment',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      newComment: {
        blog: AppState.activeBlog._id,
        creator: AppState.user.name
      }
    })
    return {
      state,
      async createComment() {
        try {
          // FIXME: Bad request?
          state.newComment.blog = AppState.activeBlog._id
          state.newComment.creator = AppState.user.name
          await blogsListService.createComment(state.newComment)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>
