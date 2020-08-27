<template>
  <div>
    <b-card
      :title="'Ad: '+adObject.title"
      :img-src="adObject.img.length>0 ? adObject.img : '/ad300x300.png'"
      :class="classes"
      img-alt="Image"
      tag="a"
      target="_blank"
      :href="adObject.url"
      img-top
    >
      <b-card-text>
        {{adObject.description}}
      </b-card-text>
    </b-card>
  </div>

</template>

<script>
import ads from '~/static/ads.json'
export default {
  props:{
    adOrder:{
      type:Number,
      required:false
    },
    height:{
      type:String,
      required:false
    },
    width:{
      type:String,
      required:false
    },
    random:{
      type:Boolean,
      required:false
    }
  },
  computed:{
    adObject: function(){
      //
      //  1.  Return a random ad if random prop is passed True with Ad object
      //
      let random = this.$props.random || false
      if(random)
      {
        //
        //  1.  If random prop is passed True, pick a random integer
        //      from 0 to length of ads json file.
        //
        let random_integer = Math.floor(Math.random() * ads.length);
        return ads[random_integer]
      }else
      {
        return ads[this.$props.adOrder]
      }
    },

    classes: function(){
      return {
        width: this.$props.width ? this.$props.width : '100%',
        height: this.$props.height ? this.$props.height : '100%',
        "text-reset": true,
        "text-decoration-none": true
      }
    }
  }

}
</script>

<style>

</style>
