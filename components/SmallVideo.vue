<template>
  <div class="my-2 small-video">
    <a :href="url">
      <img src="/ad300x300.png">
      <p>{{title}}</p>
    </a>
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
  height:100px;
  text-align:center;
}
.small-video a{
  text-decoration: none;
}
.small-video p{
  margin-top:10px
}
.small-video img{
  width:100%;
  height: 100%;
}
</style>