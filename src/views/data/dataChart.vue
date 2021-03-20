<template>
  <div>
    <el-row style="padding: 16px 16px 0; margin-bottom: 32px">
      <h3 style="text-align: center; font-size: 32px; color: #333">
        任务统计表
      </h3>
    </el-row>
    <el-row style="padding: 16px 16px 0; margin-bottom: 32px">
      <el-col>
        <div>
          <span style="font-size: 16px; margin-right: 10px">选择模块</span>
          <el-select v-model="value" placeholder="请选择" size="small" @change="toggleModule()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col></el-col>
    </el-row>
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import { countByNewType } from "@/api/data";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  }
};
export default {
  components: { LineChart },
  data() {
    return {
      lineChartData: {
        countList: [],
        dayList: []
      },
      options: [
        {
          value: 0,
          label: "头条",
        },
        {
          value: 1,
          label: "网易",
        },
        {
          value: 2,
          label: "百度",
        },
        {
          value: 3,
          label: "凤凰",
        },
        {
          value: 4,
          label: "一点",
        },
        {
          value: 5,
          label: "搜狐",
        },
        {
          value: 6,
          label: "腾讯",
        },
        {
          value: 7,
          label: "看点",
        },
        {
          value: 8,
          label: "UC",
        },
        {
          value: 9,
          label: "新浪",
        },
        {
          value: 10,
          label: "简书",
        },
        {
          value: 11,
          label: "趣头条",
        },
      ],
      value: 0,
    };
  },
  created(){
    this.getCountByNewType()
  },
  methods: {
    getCountByNewType() {
      countByNewType({
        newType: this.value || 1,
      }).then((res) => {
        if(res.data&&res.data.length>0){
          this.lineChartData.countList = res.data.map(el=>el.count)
          this.lineChartData.dayList = res.data.map(el=>el.day)
        }
      });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    toggleModule(){
      this.getCountByNewType()
    }
  },
};
</script>

<style>
</style>