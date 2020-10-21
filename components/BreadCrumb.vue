<template>
  <div class="breadcrumbs__container">
    <h2 class="breadcrumbs__title">
      AVC Website
    </h2>

   <div class="breadcrumbs__toolbar">
     <b-breadcrumb
       :items="breadcrumbs"
       class="breadcrumbs__list"
     />

     <div class="breadcrumbs__theme-toggle">
       <theme-toggle />
     </div>
   </div>
  </div>
</template>

<script>
import { caseSnakeToTitle } from '~/utils/text'
import ThemeToggle from '~/components/general/ThemeToggle/index'

export default {
  components: {
    ThemeToggle
  },

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

<style lang="scss">
.breadcrumbs {
  &__container {
    position: relative;
    display: flex;
    flex-flow: column;
    margin-bottom: 1rem;

    .breadcrumb-item.active,
    .breadcrumb-item + .breadcrumb-item::before {
      color: var(--color-font-elevated-02);
    }
  }

  &__title {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  &__toolbar {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  &__list {
    flex-grow: 1;
    margin-bottom: 0;
    background-color: var(--color-bg-elevated-02);
    padding-right: 36px;
  }

  &__theme-toggle {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (min-width: 768px) {
    &__container {
      flex-flow: row nowrap;
    }

    &__title {
      margin-bottom: 0;
    }
  }
}
</style>
