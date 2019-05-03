<template>
  <nav class="navigation">
    <el-col>
      <!-- <h5>自定义颜色</h5> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2d353c"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item v-for="(item, key) in navList" :key="key">
          <a slot="title" :href="'#/admin/' + item['_auth']">{{item.name}}</a>
        </el-menu-item>
      </el-menu>
    </el-col>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data(){
    return{
      navList: []
    }
  },
  created(){
    this.$http.get('/api/getMenu').then(res => {
      this.navList = res.data.menu
    });
  }
}
</script>

<style >
  .navigation {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    width: 220px;
    background-color: #2d353c;
    box-shadow: -4px 0 6px rgba(0,0,0,.15) inset;
  }

  .navigation .el-menu-item a{
    display: block;
    width: 100%;
    height: 100%;
    color: white;
    text-decoration: none;
  }
</style>
