<template>
  <div class="not-found-view">
  	<div class="header" id='header'>
      <mu-appbar style='background-color: #030329'>
        <div class="inner" >
          <router-link to="/" exact>
            <img class="logo" src="../assets/topbar_pic_logo.png" alt="logo">
          </router-link>
          <router-link to="/" style="">开发者</router-link>         
        </div>
      </mu-appbar>
    </div>
    <h1>404</h1>
  </div>
</template>

<style lang="stylus" scoped>
h1
  font-size 200px
  font-family 'Courgette', cursive
  color #8F8E8C
  text-align center
  margin-bottom 1px
  text-shadow 1px 1px 6px #fff
</style>
