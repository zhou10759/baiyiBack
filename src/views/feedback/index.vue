<template>
  <div class="findFeedback">
    <el-table
      :data="table"
      style="width: 90%; height: 700px; margin-top: 20px; padding: 30px"
    >
      <el-table-column type="index" width="100" label="序号"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="userName" label="用户名称"> </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      :current-page.sync="page"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findFeedback, deleteFeedback } from "@/api/data";
export default {
  data() {
    return {
      table: [],
      page: 1,
      pageSize: 15,
      total: 0,
    };
  },
  created() {
    this.getFeedBack();
  },
  methods: {
    getFeedBack() {
      findFeedback({
        page: this.page,
        pageSize: this.pageSize,
        page: this.page,
      }).then((res) => {
        this.table = res.data;
        this.total = res.count;
      });
    },
    handleCurrentChange(current) {
      this.page = current;
      this.findFeedback();
    },
    handleDelete(index, row) {
      let that = this;
      that
        .$confirm("是否要删除该反馈?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          deleteFeedback({ id: row.id }).then((res) => {
            that.$message.success("删除成功");
            that.getFeedBack();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>