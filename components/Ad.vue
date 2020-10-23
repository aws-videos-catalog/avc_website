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
      default: Math.floor(Math.random() * ads.length)
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

  data () {
    return {
      adObject: ads[this.adOrder]
    }
  },

  computed:{
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
    color: var(--color-font);
    background-clip: border-box;
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    transition: height 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;
    background-color: var(--color-bg-elevated-01);

    &:hover {
      color: var(--color-font);
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
        box-shadow: 1px 8px 25px -7px var(--color-box-shadow);
      }
    }
  }
}
</style>
