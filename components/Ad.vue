<template>
  <a
    :href="adObject.url"
    :title="'Ad: '+adObject.title"
    class="ad-card__container"
    target="_blank"
    rel="noopener"
  >
    <div
      class="ad-card__inner"
    >
      <img
        :src="adObject.img.length>0 ? adObject.img : '/ad300x300.png'"
        :alt="adObject.title"
        class="ad-card__image"
      >

      <div class="ad-card__body">
        <h4 class="ad-card__title">
          {{ adObject.title }}
        </h4>

        <div
          class="ad-card__text"
        >
          {{ adObject.description }}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import ads from '~/static/products/index.json'
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

<style lang="scss">
.ad-card {
  &__container {
    position: relative;
    height: 100%;
    display: block;
    text-decoration: none !important;
  }

  &__inner {
    width: 100%;
    height: 100%;
    min-height: 100%;
    color: rgb(33, 37, 41);
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    transition: height 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;
    background-color: #fff;

    &:hover {
      color: rgb(33, 37, 41);
    }
  }

  &__image {
    width: 100%;
  }

  &__body {
    padding: 0.45rem 1.25rem;
  }

  &__title {
    margin-bottom: 0.75rem;
  }

  @media (min-width: 968px) {
    &__container {
      height: 100%;
    }

    &__inner {
      position: absolute;
      top: 0;
      left: 0;

      &:hover {
        box-shadow: 1px 8px 25px -7px rgba(158,158,158,1);
      }
    }
  }
}
</style>
