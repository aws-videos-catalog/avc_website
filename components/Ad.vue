<template>
  <div>
    <h3> {{adObject.title}} </h3>
    <a :href="adObject.url">
    </a>
    <img :src="adObject.img.length>0 ? adObject.img : 'ad300x300.png'"/>
    <p> {{adObject.description}} </p>
  </div>
    
</template>

<script>

export default {
  props:{
    adObject:{
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>