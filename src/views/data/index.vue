<template>
  <div class="data-home">
    <div class="data-home-header">
      <div>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-input
              v-model="searchCriteria.parameter"
              placeholder="按照id，手机号，模块名搜索"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <div class="btn-list">
              <div>
                <el-date-picker
                  v-model="searchCriteria.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
              <div>
                <el-button type="primary" @click="getTaskList()">搜索</el-button>
              </div>
              <div>
                <el-button @click="handleDownload()">导出</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="$router.push('/data/charts')"
          >查看统计表</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 90%; height: 700px; margin-top: 20px"
    >
      <el-table-column type="index" width="100" label="序号"> </el-table-column>
      <el-table-column prop="id" label="id" width="100"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="userPhone" label="用户手机号"> </el-table-column>
      <el-table-column prop="newType" label="模块"> </el-table-column>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { taskList } from "@/api/data";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      tableData: [],
      searchCriteria: {
        page: 1,
        pageSize: 15,
        parameter: "",
        date: "",
      },
      total: 0,
    };
  },
  created() {
    this.getTaskList();
  },
  methods: {
    getTaskList() {
      let params = this.searchCriteria;
      if(this.searchCriteria.date){
        params.startTime = this.searchCriteria.date[0]
        params.endTime = this.searchCriteria.date[1]
      }
      taskList(params).then((res) => {
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    handleCurrentChange() {
      this.searchCriteria = current;
      this.getTaskList();
    },
     handleDownload() {
      // this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "id",
          "createTime",
          "userPhone",
          "newType",
        ];
        const filterVal = [
          "id",
          "createTime",
          "userPhone",
          "newType",
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
.data-home {
  padding: 20px 0 0 20px;
  &-header {
    width: 80%;
    .header-right {
      float: right;
      width: 120px;
    }
    & > div {
      display: inline-block;
    }
    .btn-list {
      display: flex;
      & > div {
        margin-right: 20px;
      }
    }
  }
}
</style>
