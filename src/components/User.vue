<template>
  <div>
    <div class="page-header">
      <ol class="heading">
        <li>
          <a>用户管理</a>
        </li>
      </ol>
    </div>

    <div class="page-body">
      <el-row>
        <el-col :span="16">
          <el-card class="box-card" style="margin-right: 8px;"> 
            <el-table
            :data="userList"
            style="width: 100%;">
              <el-table-column
                label="序号"
                width="60">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column
                prop="email"
                label="权限名称">
              </el-table-column>
              <el-table-column
                prop="roles[_text]"
                label="角色">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    >查看</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="dropUser(scope.row['_id'])"
                    >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <h3>添加用户</h3>
            <el-input placeholder="邮箱" v-model="formData.email">
              <template slot="prepend">  邮  箱  ：</template>
            </el-input>
            <el-input placeholder="密码" v-model="formData.pwd" show-password style="margin-top: 8px;">
              <template slot="prepend">  密  码  ：</template>
            </el-input>
            <el-input placeholder="备注" v-model="formData.remark" style="margin-top:8px;">
              <template slot="prepend"> 备  注  ：</template>
            </el-input>
            <div class="el-input el-input-group el-input-group--prepend" style="margin-top: 8px;">
                <div class="el-input-group__prepend">  角  色  ：</div>
                <el-select v-model="roles" slot="prepend" placeholder="请选择">
                  <el-option :label="item.name"  :ref="item['_id']" :value="item['_id']" v-for="(item, key) in roleList" :key="key">{{item.name}}</el-option>
                </el-select>
            </div>
            <el-button style="margin-top:8px;" type="primary" @click="addUser()">添加用户</el-button>
          </el-card>
          <!-- <el-table>
            <el-table-column label="添加用户"></el-table-column>
          </el-table> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      authList:[{
        name: '用户管理权限',
        group: 0
      },{
        name: '用户管理权限',
        group: 0
      }],
      formData:{
        email: '',
        pwd: '',
        remark: '',
        roles: {}
      },
      roles: '',
      userList:[],
      roleList:[]
    }
  },
  methods:{
    getUserList(){
      this.$http.get('/api/getUserList').then(res => {
        this.userList = res.data.data
      });
    },
    getRoleList(){
      this.$http.get('/api/getRoleList').then(res => {
        this.roleList = res.data.data
      });
    },
    addUser(){
      // this.$http.post('')
      // console.log(this.formData)
      this.formData['roles']['_id'] = this.roles
      // console.log(this.$refs[this.roles][0]['label'])
      this.formData['roles']['_text'] = this.$refs[this.roles][0]['label']

      // console.log(this.formData)
      this.$http.post('/api/addUser', this.formData).then(res => {
        this.$alert(res.data.msg, '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.getUserList();
          }
        });
      });
    },
    dropUser(_id){
      // console.log(id)
      // debugger
      // let option = {
      //   '_id': id
      // }
      this.$http.post('/api/dropUser', {'_id': _id}).then(res => {
        console.log(res)
      });
    }
  },
  created(){
    this.getUserList();
    this.getRoleList();
  }
}
</script>

<style>
  .page-header{
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eee;
  }
  
  .heading{
    margin: 0;
    border-left: 6px solid #2d353c;
    font-size: 21px;
    font-weight: 500;
    line-height: 30px;
    padding: 0 0 0 6px;
    height: 30px;
  }

  .page-header>.heading>li {
    list-style: none;
    float: left;
  }
  
  .el-input-group--prepend .el-select .el-input.is-focus .el-input__inner{
    border-color: #409EFF;
  }
</style>

