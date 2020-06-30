<template>
  <div>
    <div v-for="(sub_items,parent) in items" :key="parent">
      <p class="title">{{parent}}</p>
      <ul>
          <li v-for="sub in sub_items" :key="sub.name">
            <nuxt-link :to="'services/'+names_to_links[sub.name]">
              {{sub.name}}
            </nuxt-link>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
//
//  This component will render a tree-like view when a JSON is given
//
export default {
  props:{
    items:{
      type:Object,
      required:true,
    }
  },
  computed:{
    names_to_links: function(){
      let dct = {}
      for (const [parent, value] of Object.entries(this.$props.items)) {
        value.forEach((item,idx)=>{
          let link = item.name.split(' ').join('_').toLowerCase()
          dct[item.name] = link
        })
      }
      return dct
    }
  }
}
</script>

<style>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: inline-block;
  font-weight: 700;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>