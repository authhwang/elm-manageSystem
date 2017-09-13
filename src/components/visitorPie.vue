<template>
  <div class="visitorPie">
    <div id="pie" style="width: 90%;height: 450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';  //主标题
import 'echarts/lib/component/legend'; //不同线的颜色和名字
import 'echarts/lib/component/tooltip'; //提示框的组件

export default {
  props: ['visitorList'],
  mounted() {
    this.myCharts = echarts.init(document.getElementById('pie'));
    this.initData();
  },
  methods: {
    initData() {
      let option = {
        legend: {
          data: ['北京', '上海', '深圳', '杭州', '其他'],
          orient: 'vertical',
          left: '10px'
        },
        title: {
          text: '用户分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '用户来源',
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: [
              {value: this.visitorList.beijing, name: '北京'},
              {value: this.visitorList.shanghai, name: '上海'},
              {value: this.visitorList.shenzhen, name: '深圳'},
              {value: this.visitorList.hangzhou, name: '杭州'},
              {value: this.visitorList.qita, name: '其他'}
            ]
          }
        ]
      };
      this.myCharts.setOption(option);
    }
  },
  watch: {
    visitorList(value) {
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
.visitorPie {
  justify-content: center;
  display: flex;
  margin-top: 20px;
}
</style>
