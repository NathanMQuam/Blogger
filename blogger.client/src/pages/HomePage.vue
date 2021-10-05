<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="container h-100">
      <!-- TODO: Move create blog post to better place -->
      <CreateBlog class="row" />
      <Blog class="row" v-for="blogData in state.blogs" :key="blogData.id" :blog="blogData" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { computed, reactive } from 'vue'
import { AppState } from '../AppState.js'
import { blogsListService } from '../services/BlogsListService.js'
import Blog from '../components/Blog.vue'
import CreateBlog from '../components/CreateBlog.vue'
export default {
  name: 'Home',
  setup() {
    console.log(computed(() => AppState.blogs))
    const state = reactive({
      blogs: computed(() => AppState.blogs)
    })
    blogsListService.getBlogs()
    console.log(state.blogs)
    return {
      state
    }
  },
  components: {
    Blog,
    CreateBlog
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
}
</style>
