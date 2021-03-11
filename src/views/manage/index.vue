<template>
  <div class="manage-home">
    <el-row :gutter="12">
      <el-col :span="3">
        <el-input
          v-model="searchCriteria.parameter"
          placeholder="按照手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <div class="btn-list">
          <div>
            <el-button type="success" @click="getUser()">搜索</el-button>
          </div>
          <div>
            <el-button type="primary" @click="formVisible = true"
              >添加用户</el-button
            >
          </div>
          <div>
            <el-button @click="handleDownload()">导出</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 90%; height: 700px; margin-top: 20px"
    >
      <el-table-column type="index" width="100" label="序号"> </el-table-column>
      <el-table-column prop="userId" label="用户ID"> </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar size="large" :src="scope.row.userAvatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="积分数">
        <template slot-scope="scope">
          <div v-if="!scope.row.update">{{ scope.row.integralNum }}</div>
          <div v-else>
            <el-input v-model="scope.row.integralNum"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="!scope.row.update"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="success"
            v-else
            @click="handleConfirm(scope.$index, scope.row)"
            >确认</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-right: 20px; margin-top: 20px"
      @current-change="handleCurrentChange"
      :current-page.sync="searchCriteria.page"
      :page-size="searchCriteria.pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="formVisible"
      width="25%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cleseDialog"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="/admin/adminUpload/mapUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="ruleForm.userAvatar"
              :src="ruleForm.userAvatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserList, addUser, updateIntegral , pullBlack } from "@/api/data";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    var checkedPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号"));
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error("手机号输入错误"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      searchCriteria: {
        page: 1,
        pageSize: 15,
        parameter: "",
      },
      total: 0,
      ruleForm: {
        userName: "",
        phoneNumber: "",
        password: "",
        userAvatar: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 24,
            message: "长度在 3 到 24 个字符",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            trigger: "blur",
            validator: checkedPhone,
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 24,
            message: "长度在 6 到 24 个字符",
            trigger: "blur",
          },
        ],
      },
      formVisible: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserList(this.searchCriteria).then((res) => {
        res.data.forEach((el) => {
          el.update = false;
        });
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    handleCurrentChange(current) {
      this.searchCriteria = current;
      this.getUser()
    },
    handleAvatarSuccess(res) {
      if (res.code === "000000") {
        this.ruleForm.userAvatar = res.data;
      } else {
        this.$message.error(res.message);
      }
    },
    cleseDialog() {
      this.ruleForm = {
        userName: "",
        phoneNumber: "",
        password: "",
        userAvatar: "",
      };
    },
    submitForm() {
      let that = this;
      that.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          addUser(that.ruleForm).then((res) => {
            if (res.code === "000000") {
              that.$message.success("添加成功");
              that.getUser();
              that.formVisible = false;
            }
          });
        } else {
          that.$message.error(res.msg);
          return false;
        }
      });
    },
    handleEdit(index, row) {
      // if(row.update){
      // row.update = !row.update;
      // }else{

      // }
      this.tableData = this.tableData.map((el, i) => {
        if (i === index) {
          el.update = !el.update;
        } else {
          el.update = false;
        }
        return el;
      });
    },
    handleConfirm(index, row) {
      updateIntegral({
        userId: row.userId,
        integralNum: row.integralNum,
      }).then((res) => {
        this.$message.success("修改成功");
        row.update = !row.update;
      });
    },
    handleDelete(index, row) {
      pullBlack({
        userId: row.userId
      }).then(res=>{
        this.getUser()
        this.$message.success("删除成功")
      })
    },
    handleDownload() {
      // this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "userId",
          "phoneNumber",
          "userName",
          "userAvatar",
          "integralNum",
        ];
        const filterVal = [
          "userId",
          "phoneNumber",
          "userName",
          "userAvatar",
          "integralNum",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list" + new Date().getTime(),
        });
        // this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.tableData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.manage-home {
  padding: 20px 0 0 20px;
  .btn-list {
    display: flex;
    & > div {
      margin-right: 10px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border: 1px dashed #d9d9d9;
}
</style>
