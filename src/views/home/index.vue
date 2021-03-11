<template>
  <div class="admin-home">
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div>
            <h3>{{initData.userTotal}}</h3>
            <h4>会员数量</h4>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          <div>
            <h3>{{initData.exportTotal}}</h3>
            <h4>任务总数量</h4>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getInitData } from "@/api/data"
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data(){
    return{
      initData:{}
    }
  },
  created(){
    getInitData().then(res=>{
      this.initData = res.data;
    })
  }
};
</script>

<style lang="scss" scoped>
.admin-home{
    padding: 20px 0 0 20px;
}
</style>
