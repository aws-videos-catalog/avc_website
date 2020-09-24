<template>
  <div class="nav">
    <h2>
      AVC Website
    </h2>

    <b-breadcrumb
        :items="breadcrumbs"
        style="flex-grow:1;margin-left:1rem"
    />
  </div>
</template>

<script>
import { caseSnakeToTitle } from '~/utils/text'

export default {
  computed: {
    /**
     * Collect breadcrumbs from route params with branching-like structure based on routes nesting
     * @returns {[{href: string, text: string}]}
     */
    breadcrumbs () {
      const params = this.$route.params

      const crumbs = [
        {
          href: '/',
          text: 'Home'
        }
      ]

      if (params.category) {
        crumbs.push({
          text: caseSnakeToTitle(params.category), //capitalize words
          href: this.$router.resolve({
            name: 'category',
            params: {
              category: params.category
            }
          }).href
        })

        if (params.name) {
          crumbs.push({
            text: caseSnakeToTitle(params.name),
            href: this.$router.resolve({
              name: 'category-name',
              params: {
                category: params.category,
                name: params.name
              }
            }).href
          })
        }

        if (params.video) {
          crumbs.push({
            text: params.video
          })
        }
      }

      return crumbs
    }
  }
}
</script>

<style>
.nav {
  display: flex;
  flex-direction: row;
}
</style>
