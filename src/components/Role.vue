<template>
  <div>
    <div class="page-header">
      <ol class="heading">
        <li>
          <a>角色管理</a>
        </li>
      </ol>
    </div>

    <div class="page-body">
      <el-row>
        <el-col :span="16">
          <el-card class="box-card" style="margin-right: 8px;"> 
            <el-table
            :data="authList"
            style="width: 100%;">
              <el-table-column
                label="序号"
                width="60">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="权限名称"
                width="180">
              </el-table-column>
              <el-table-column
                label="权限">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row['_group']" size="small">
                    <el-radio-button label="0">无</el-radio-button>
                    <el-radio-button label="1">可读</el-radio-button>
                    <el-radio-button label="2">读写</el-radio-button>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <h3>添加角色</h3>
            <el-input placeholder="角色名称" v-model="formData.name">
              <template slot="prepend">角色名称：</template>
            </el-input>
            <el-input placeholder="备注" v-model="formData.remark" style="margin-top:8px;">
              <template slot="prepend"> 备  注  ：</template>
            </el-input>
            <el-button style="margin-top:8px;" type="primary" @click="addRole()">添加角色</el-button>
          </el-card>
          <!-- <el-table>
            <el-table-column label="添加角色"></el-table-column>
          </el-table> -->
        </el-col>
      </el-row>
    </div>

    <div class="page-header">
      <ol class="heading">
        <li>
          <a>角色列表</a>
        </li>
      </ol>
    </div>

    <div class="page-body">
      <el-row>
        <el-col :span="24">
          <el-table
          :data="roleList"
          style="width: 100%;">
              <el-table-column
                label="序号"
                width="60">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="角色名称"
                >
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    >编辑</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="dropRole(scope.row['_id'])">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      authList:[],
      formData:{
        name: '',
        remark: '',
        roles: []
      },
      roleList:[]
    }
  },
  methods:{
    init(){
      // this.authList = [{
      //   name: '角色管理权限',
      //   group: 0
      // },{
      //   name: '用户管理权限',
      //   group: 0
      // }]
      this.$http.get('/api/getAuth').then(res => {
        this.authList = res.data.menu
        // console.log(res)
      });
    },
    getRoleList(){
      this.$http.get('/api/getRoleList').then(res => {
        // debugger
        this.roleList = res.data.data
      });
    },
    addRole(){
      this.formData['roles'] = this.authList
      // console.log(this.formData)

      this.$http.post('/api/addRole', this.formData).then(res => {
        this.$alert(res.data.msg, '提示',{
          confirmButtonText: '确定',
          callback: () => {
            this.init();
            this.getRoleList();
          }
        });
      });
    },
    dropRole(_id){
      this.$http.post('/api/dropRole', {'_id': _id}).then(res => {
        // console.log(res)
        this.$$alert(res.data.msg, '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.getRoleList();
          }
        })
      });
    }
  },
  created(){
    this.init();
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
</style>

