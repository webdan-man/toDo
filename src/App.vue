<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{margin:0;padding:0;box-sizing:border-box;background-position:center;background-repeat:no-repeat;outline: none;-webkit-tap-highlight-color: rgba(0,0,0,0);}
  a:after,a:before,br:after,br:before,img:after,img:before,span:after,span:before,sup:after,sup:before,table:after,table:before,td:after,td:before,tr:after,tr:before{content:none}
  a{text-decoration:none;color:inherit;outline:0!important}
  button,input,textarea{outline:0; background: none; border: none;-webkit-tap-highlight-color: rgba(0,0,0,0)}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  background: lightslategrey;
}
  textarea {
    resize: none;
    width: 100%;
    height: 29px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    padding: 5px;
    margin-left: -5px;
    &:focus {
      box-shadow: inset 0 0 0 2px #0079bf;
    }
  }
  button {
    margin: 5px;
    background: green;
    padding: 0 10px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    color: white;
    &:hover {
      transition: all 0.3s;
      box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
    }
    &.cancel {
      background: #ededed;
      color: black;
    }
    &.remove {
      background: #d95767;
    }
  }
</style>
