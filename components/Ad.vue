<template>
  <div>
  <b-card
    :title="adObject.title"
    :img-src="adObject.img.length>0 ? adObject.img : '/ad300x300.png'"
    img-alt="Image"
    class="text-reset text-decoration-none"
    tag="a"
    href="https://google.com"
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
      type:Number,
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
        
    }
  }

}
</script>

<style>

</style>