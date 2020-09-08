<template>
  <div>
    <b-row>
      <b-col
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <ad
          :ad-order="random_ad_order[0]"
          class="my-2 service-listings__card"
          :height="'400px'"
        />
      </b-col>
      <b-col
        v-for="(item,idx) in items"
        :key="`item_${idx}`"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <nuxt-link class="service my-2" :to="links[idx]+'/'" append component="div">
          <b-card
            :title="item.name"
            :img-src="item.img ? '/aws/svg/SVG Light'+item.img : '/aws/svg/SVG Light/_Group Icons/AWS-Cloud-alt_light-bg.svg'"
            img-alt="Image"
            img-top
            class="service-listings__card"
          >
            <b-card-text>
              {{item.description}}
            </b-card-text>
          </b-card>
        </nuxt-link>
      </b-col>
    </b-row>
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

<style scoped>

.service{
  text-decoration: none;
  color: inherit;
  display:block;
  height:100%;
}

.service-listings__card {
  height: auto;
  width: 100%;
  overflow: hidden;
}

@media (min-width: 576px) {
  .service-listings__card {
    height: 400px;
  }
}
</style>
