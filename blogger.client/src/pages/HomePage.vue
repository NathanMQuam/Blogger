<template>
  <div class="container">
    <div class="row" v-for="blog in state.blogs" :key="blog.id" :blog="blog">
      <div class="col">
        {{ blog.title }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { computed, reactive } from 'vue'
import { AppState } from '../AppState.js'
import { blogsListService } from '../services/BlogsListService'
// import Blog from '../components/Blog'
// import CreateBlog from '../components/CreateBlog'
export default {
  name: 'Home',
  setup() {
    console.log('Home Page script')
    console.log(computed(() => AppState.blogs))
    const state = reactive({
      blogs: computed(() => AppState.blogs)
    })
    blogsListService.getBlogs()
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      width: 200px;
    }
  }
}
</style>
