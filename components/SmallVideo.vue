<template>
  <div class="my-2 small-video">
    <a :href="url">
      <img src="/ad300x300.png">
    </a>
    <p>{{title}}</p>
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
  }

}
</script>

<style scoped>  
.small-video{
  min-width:100%
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