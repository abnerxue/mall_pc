<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <ContentLeft></ContentLeft>
      <router-view />
    </div>
    
    <News></News>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import News from '@/components/news.vue'
import ContentLeft from '@/components/content_left.vue'
export default {
  name: 'App',
  components: { Header, Footer, News, ContentLeft }
}
</script>

<style>
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
img {
  vertical-align: top;
  border: none;
}
i {
  font-style: normal;
}
button {
  border: 0;
  outline: none;
}
input {
  outline: 0;
  border: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
a{
  text-decoration: none;
  color: #000;
}
.content{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.el-rate__icon{
  font-size: 25px;
}
</style>
