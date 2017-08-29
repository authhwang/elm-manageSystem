<template>
  <div class="tendency">
    <div id="tendency" style="width:90%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';  //主标题
import 'echarts/lib/component/legend'; //不同线的颜色和名字
import 'echarts/lib/component/toolbox';  //工具栏 有导出图片 数据视图 动态类型转换 数据区域缩放 重置 5个工具
import 'echarts/lib/component/markPoint';  //
import 'echarts/lib/component/tooltip'; //提示框的组件
export default {
  props: ['sevenDay', 'sevenDate'],
  mounted () {
    this.myCharts = echarts.init(document.getElementById('tendency'));
    this.ininData();
  },
  methods: {
    ininData () {
      const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66'];
      const option = {
        color: colors,
        title: {
          text: '趋势图'
        },
        tooltip: {
          trigger: 'axis' //坐标轴触发 主要在折线图 柱状图等图标使用
        },
        legend: {
          data: ['API请求量', '新注册用户', '新增订单', '新增管理员']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            name: 'API请求量',
            min: 0,
            max: 200000,
            axisLine: {    //坐标轴线的样式
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'right',
            name: '用户、订单',
            min: 0,
            max: 400,
            axisLine: {
              lineStyle: {
                color: '999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'API请求量',
            type: 'line',
            data: this.sevenDate[0],
            markPoint: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          {
            name: '新注册用户',
            type: 'line',
            data: this.sevenDate[1],
            yAxisIndex: 1,
            markPoint: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          {
            name: '新增订单',
            type: 'line',
            data: this.sevenDate[2],
            yAxisIndex: 1,
            markPoint: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          {
            name: '新增管理员',
            type: 'line',
            data: this.sevenDate[3],
            yAxisIndex: 1,
            markPoint: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          }
        ]
      };
      this.myCharts.setOption(option);
    }
  },
  watch: {
    sevenDay: function(value) {
      this.ininData();
    },
    sevenDate: function(value) {
      this.ininData();
    }
  }
};
</script>

<style lang="less" scoped>
.tendency {
  display: flex;
  justify-content: center;
}
</style>

