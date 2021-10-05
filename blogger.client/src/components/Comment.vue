<template>
  <div class="comment m-1 p-1" v-if="comment.creator">
    <small>{{ comment.creator.name }}</small>
    <p>
      {{ comment.body }}
    </p>
    <div v-if="state.user">
      <button type="button" v-if="state.user.isAuthenticated && state.user.email == comment.creator.email" @click="deleteComment">
        Delort Commemt
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState.js'
import { blogsListService } from '../services/BlogsListService'
export default {
  name: 'Comment',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    comment: Object
  },
  setup(props) {
    // console.log('Comment user:', AppState.user)
    const state = reactive({
      user: computed(() => AppState.user),
      comment: computed(() => props.comment)
    })
    return {
      state,
      async deleteComment() {
        blogsListService.deleteComment(state.comment.id)
      }
    }
  }
}
</script>
