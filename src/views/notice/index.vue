<template>
  <div class="dashboard-container">
    <h2 class="dashboard-text">输入公告</h2>
    <div id="editor"></div>
    <div style="text-align: center">
      <el-button
        style="margin: 20px"
        size="medium"
        type="primary"
        @click="getEditorVal()"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import E from "wangeditor";
import { updateRichText, getRichText } from "@/api/data";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      editor: null,
    };
  },
  async mounted() {
    this.editor = new E("#editor");
    // 配置 server 接口地址
    // 设置编辑区域高度为 500px
    this.editor.config.height = 600;
    this.editor.config.uploadFileName = "file";
    this.editor.config.uploadImgServer = "/admin/adminUpload/mapUpload";
    this.editor.create();
    this.editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        console.log(xhr);

        // 可阻止图片上传
        // return {
        //   prevent: true,
        //   msg: "需要提示给用户的错误信息",
        // };
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log("fail", resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        console.log("customInsert", result);

        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.data);
      },
    };
    let res = await getRichText();
    console.log("——————————————————————————", res);
  },
  methods: {
    getEditorVal() {
      console.log("editor.txt.html()", this.editor.txt.html());
      updateRichText({
        text: this.editor.txt.html(),
      }).then((res) => {
        this.$message.success("提交成功");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
