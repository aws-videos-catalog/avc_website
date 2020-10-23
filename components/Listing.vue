<template>
  <div
    class="service-listings__container"
  >
    <div class="service-listings__card">
      <ad
        :ad-order="adsOrder[0]"
      />
    </div>

    <div
      v-for="(service, idx) in items"
      :key="idx"
      class="service-listings__card"
    >
      <service-card
        :service="service"
      />
    </div>

    <div class="service-listings__card">
      <ad
        :ad-order="adsOrder[1]"
      />
    </div>
  </div>
</template>

<script>
import Ad from '~/components/Ad.vue'
import ServiceCard from '~/components/sections/services/ServiceCard/index'

//
//  This component will render a tree-like view when a JSON is given
//
export default {
  name: 'Listing',

  components:{
    Ad,
    ServiceCard
  },

  props:{
    items:{
      type:Array,
      required:true,
    },

    adsOrder: {
      type: Array,
      required: true
    }
  },

  computed:{
    links: function(){
      //
      //  1.  Create an empty array called links, which we will populate with links only.
      //
      let links = []
      let i = 0;
      for (const value of this.$props.items) {
        //
        //  2.  Create converted link name to put in url.
        //
        let link = value.name.split(' ').join('_').toLowerCase()
        //
        //  3.  Push it to links array.
        //
        links.push(link)
      }
      return links
    }
  }
}
</script>

<style lang="scss">
.service-listings {
  &__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  &__card {
    height: auto;
  }

  @media (min-width: 480px) {
    &__container {
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }

    &__card {
      height: 100%;
    }
  }

  @media (min-width: 680px) {
    &__container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 908px) {
    &__container {
      grid-template-columns: repeat(auto-fill, 260px);
      justify-content: start;
    }

    &__card {
      height: 400px;
    }
  }
}
</style>
