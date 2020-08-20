<template>
  <div class="my-2 small-video">
    <a :href="url">
      <img :alt="title" src="/ad300x300.png">
    </a>
    <p>{{truncateTitle}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type:String
    },
    url: {
      type:String
    }
  },
  computed:{
    truncateTitle: function(){
      if (this.$props.title.length <= 65) {
        return this.$props.title
      }
      return this.$props.title.slice(0, 65) + '...'
    }
  }

}
</script>

<style scoped>  
.small-video{
  min-width:100%;
  max-width: 200px;
}
.small-video img{
  width:200px;
  height:120px;
}
@media (max-width : 462px) {
.small-video img{
  display:inline-block;
}

.small-video p{
  display:inline;
}

}
</style>  