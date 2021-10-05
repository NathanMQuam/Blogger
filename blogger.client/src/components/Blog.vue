<template>
  <div class="blog" v-if="blog.creator">
    <div class="col-2">
      <router-link :to="{name: 'BlogPage', params: {id: blog.id}}">
        <img class="img-fluid" :src="blog.creator.picture" alt="">
      </router-link>
    </div>
    <div class="col text-left">
      <router-link :to="{name: 'BlogPage', params: {id: blog.id}}">
        <div class="w-100">
          {{ blog.title }}
          <p><small>{{ blog.creator.name }}</small></p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    blog: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
