<template>
  <div>
    <ad :adOrder="random_ad_order[0]"></ad>
    <div v-for="(item,idx) in items" :key="`item_${idx}`">
      <p class="title">
      <nuxt-link :to="'/'+links[idx]">
        {{item}}
      </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
  import Ad from '~/components/Ad.vue'
  import ads from '~/static/ads.json'

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
  components:{
    Ad
  },
  props:{
    items:{
      type:Array,
      required:true,
    }
  },
  data(){
    return{
      ads:ads
    }
  },
  computed:{
    links: function(){
      let links = []
      let i = 0;
      for (const value of this.$props.items) {
        let link = value.split(' ').join('_').toLowerCase()
        links.push(link)
      }
      return links
    },
    //
    //  2.  A function to randomize the ad order.
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

<style scoped>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: inline-block;
  font-weight: 700;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>