<template>
  <div class="blogPage w-100">
    <div class="container" v-if="state.blog">
      <div class="row">
        <div class="col-2" v-if="state.blog.creator">
          <img :src="state.blog.creator.picture" class="img-fluid">
        </div>
        <div class="col-4" v-if="state.blog.creator">
          {{ state.blog.creator.name }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h3 class="text-center">
            {{ state.blog.title }}
          </h3>
          <p>
            {{ state.blog.body }}
          </p>
          <div v-if="state.user">
            <div v-if="state.blog.creator">
              <div v-if="state.user.email == state.blog.creator.email">
                <form @submit.prevent="editBlog">
                  <div class="input-group">
                    <input type="text" name="title" v-model="state.blog.title">
                  </div>
                  <div class="input-group">
                    <textarea name="body" cols="50" rows="3" v-model="state.blog.body"></textarea>
                  </div>
                  <button @click="deleteBlog" class="mt-auto">
                    delort
                  </button>
                  <button type="submit" class="mt-auto">
                    edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <CreateComment />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Comment v-for="commentData in state.comments" :key="commentData.id" :comment="commentData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { computed, onMounted, reactive } from 'vue'
import { /* onBeforeRouteLeave, */ useRoute, useRouter } from 'vue-router'
import { blogsListService } from '../services/BlogsListService.js'
import { AppState } from '../AppState.js'
import Comment from '../components/Comment.vue'
import CreateComment from '../components/CreateComment.vue'
export default {
  name: 'BlogPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      // console.log(route.params.id)
      blogsListService.getBlogById(route.params.id)
      blogsListService.getCommentsByBlogId(route.params.id)
      console.log('Blog:', state.blog)
      console.log('User:', state.user)
      console.log('Comments:', state.comments)
    })
    // onBeforeRouteLeave((to, from, next) => {
    //   // if confirmed and if any of the input fields have a value
    //   if (window.confirm('You sure bro?')) {
    //     AppState.activeBlog = {}
    //     AppState.comments = {}
    //     next()
    //   }
    // })

    return {
      route,
      state,
      async deleteBlog() {
        console.log('attempted to delort blog')
        if (window.confirm('Are you sure you want to delete this blog?')) {
          blogsListService.deleteBlogPost()
          router.push('/')
        }
      },
      async editBlog() {
        blogsListService.editBlogPost(state.blog)
      }
    }
  },
  components: {
    Comment,
    CreateComment
  }
}
</script>

<style lang="scss" scoped>

</style>
