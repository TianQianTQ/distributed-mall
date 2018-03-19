<template>
  <div id="component">
    <h1 v-text="title"></h1>
    <button @click="onclickMe">click</button>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      title:'this is componentA',
      items:[],
      newItem:'',
    }
  },
  props:['messageFromfather'],
  methods:{
    onclickMe:function(){
      console.log(this.title+"  "+this.messageFromfather);
      this.$emit('children-tellmesomething',this.title);
    }
  }
}
</script>

<style>
</style>
