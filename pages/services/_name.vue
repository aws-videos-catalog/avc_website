<template>
  <div>
    {{name}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: this.$route.params.name,
      
    }
  }
}
</script>

<style>



</style>