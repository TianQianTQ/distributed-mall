<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem"
           @keyup.enter="addNew"
    >
    <ul>
      <li v-for="item in items"
          v-bind:class="{finished:item.isFinished}"
          @click="click(item)"
      >{{item.label}}</li>
    </ul>
    <component-a messageFromfather="i am your father"
    v-on:children-tellmesomething="listenmyboy"></component-a>
    <p>children tells me:{{childwords}}</p>
  </div>
</template>

<script>
  import Store from './store'
  import componentA from './components/componentA'
  console.log(Store);
export default {
  components: {componentA},
  data:function(){
    return {
      title:'this is a todo list',
      items:Store.fetch(),
      newItem:'',
      childwords:'',
    }
  },
  watch:{
    items:{
      handler:function(items){
          Store.save(items);
      },
      deep:true
    }
  },
  methods:{
    listenmyboy:function(msg){
       this.childwords = msg;
    },
    click:function(item){
      console.log('clcik'+item.label);
      item.isFinished = !item.isFinished;
    },
    addNew:function(){
      this.items.push({
        label:this.newItem,
        isFinished:false
      })
        this.newItem = ''
    }
  }
}
</script>

<style>
  .finished{
    text-decoration:underline;
  }
html{
  height:100%;
}
body{
  display:flex;
  align-items:center;
  justify-content: center;
  height:100%;
}
  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: "Source Code Pro", Helvetica, SansSerif;
    text-align: center;
  }
  #app a{
    color:#42b983;
    text-decoration:none;
  }
  .logo{
    width:100px;
    height:100px;
  }
  ul li{
    cursor:pointer;
  }
</style>
