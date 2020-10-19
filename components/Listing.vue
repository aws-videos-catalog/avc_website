<template>
  <div
    class="service-listings__container"
    :class="classContainer"
  >
    <div class="service-listings__card">
      <ad
        :ad-order="random_ad_order[0]"
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
        :ad-order="random_ad_order[1]"
      />
    </div>
  </div>
</template>

<script>
import Ad from '~/components/Ad.vue'
import ads from '~/static/products/index.json'
import ServiceCard from '~/components/sections/services/ServiceCard/index'

  //
  //  1.  Defining a new property which would shuffle an array
  //
  Object.defineProperty(Array.prototype, 'shuffle', {
    //
    //  1.  Return the following value
    //
    value: function() {
      //
      //  1.  Start by decrementing an i value from the end of array.
      //
      for (let i = this.length - 1; i > 0; i--) {
        //
        //  1.  Pick a number inside range 0-i
        //
        const j = Math.floor(Math.random() * (i + 1));
        //
        //  2.  Switch places of element i and element j
        //
        [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
    }
});
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

    centered:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      ads:ads
    }
  },
  computed:{
    classContainer () {
      return [
        { 'service-listings--centered': this.centered }
      ]
    },

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
    },
    //
    //  1.  A function to randomize the ad order.
    //
    random_ad_order: function(){
      //
      //  1.  Create an array with the same length of ads
      //      starting from 0.
      //
      const arr = [...Array(ads.length).keys()];
      return arr.shuffle()
    }
  }
}
</script>

<style lang="scss">
.service-listings {
  &__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }

  &__card {
    height: auto;
  }

  @media (min-width: 480px) {
    &__container {
      grid-template-columns: 50% 50%;
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

    &--centered {
      justify-content: center;
    }

    &__card {
      height: 400px;
    }
  }
}
</style>
