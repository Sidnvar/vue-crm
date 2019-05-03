<template>
  <div class="login">
    <div class="box">
      <div class="brand"></div>
      <div class="content">
        <div class="content-head">
          <h3>欢迎回来</h3>
        </div>
        <div class="content-body">
          <form>
            <!-- <div class=""> -->
              <!-- <label>Email:</label> -->
              <!-- <el-form-item label="用户名" prop="email"> -->
                <!-- <el-input v-model="email" placeholder="Email"></el-input> -->
              <!-- </el-form-item> -->
            <!-- </div> -->
            <div>
              <el-input placeholder="Email" v-model="email" name="email">
                <template slot="prepend">邮箱：</template>
              </el-input>
            </div>
            
            <div style="margin-top: 15px;">
              <el-input v-model="pwd" placeholder="密码" name="pwd" show-password>
                <template slot="prepend">密码：</template>
              </el-input>
            </div>

            <div style="margin-top: 15px;">
              <el-button  style="width:100%;" size="medium" type="primary" @click="login()">登录</el-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loign',
  data() {
    return {
      email: '',
      pwd: ''
    }
  },
  methods:{
    login(){
      let formData = {
        username: this.email,
        pwd: this.pwd
      }
      this.$http.post('/api/login', formData).then(res => {
        if(res.data.success){
          return this.$router.push({ path:'/admin'})
        }

        this.$alert(res.data.msg, '错误', {
          confirmButtonText: '确定'
        });
      })
    }
  }
}
</script>

<style>
  .login{
    width: 100%;
    height: 100%;
    background: #2d353c;
  }

  .box{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 360px;
    margin-left: -180px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .content{
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    border-color: #ddd;
  }

  .content-head{
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  .content-body{
    padding: 15px;
  }  
</style>


