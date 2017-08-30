<template>
  <div>
    <elm-header></elm-header>
    <div id="data-section">
      <header class="header">数据统计</header>
      <el-row class="row" :gutter="20">
        <el-col :span="5" ><div class="today-data-header data-box"><span class="data head">当日数据：</span></div></el-col>
        <el-col :span="5" ><div class="data-box"><span class="data">{{todayApiCount}}</span> API请求量</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{todayUserCount}}</span> 新增用户</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{todayOrderCount}}</span> 新增订单</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{todayAdminCount}}</span> 新增管理员</div></el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="5" ><div class="total-data-header data-box"><span class="data head">总数据：</span></div></el-col>
        <el-col :span="5" ><div class="data-box"><span class="data">{{allApi}}</span><span v-if="allApiCount> 10000" class="wan">万</span> API请求量</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{allUserCount}}</span> 注册用户</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{allOrderCount}}</span> 订单</div></el-col>
        <el-col :span="4" ><div class="data-box"><span class="data">{{allAdminCount}}</span> 管理员</div></el-col>
      </el-row>
    </div>
    <tendency :sevenDay='sevenDay' :sevenDate='sevenDate'></tendency>
  </div>
</template>

<script>
import header from '@/components/header';
import tendency from '@/components/tendency';
import {getTodayRegisterUserCount, getTodayOrderCount, getTodayRegisterAdminCount, getTodayApiCount, getAllRegisterUserCount, getAllOrderCount, getAllRegisterAdminCount, getAllApiCount} from '@/common/js/common.js';
import dtime from 'time-formater';
export default {
  components: {
    'elm-header': header,
    'tendency': tendency
  },
  data () {
    return {
      todayUserCount: null,
      todayOrderCount: null,
      todayAdminCount: null,
      todayApiCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      allApiCount: null,
      sevenDay: [],
      sevenDate: [[], [], [], []],
    };
  },
  computed: {
    allApi() {
      return this.allApiCount > 10000 ? (this.allApiCount / 10000).toFixed(2) : this.allApiCount;
    }
  },
  mounted () {
    this.initData();
    this.getSevenDay();
    this.getSevenData();
  },
  methods: {
    initData () {
      let today = dtime().format('YYYY-MM-DD');
      Promise.all([getTodayApiCount(today), getTodayRegisterUserCount(today), getTodayOrderCount(today), getTodayRegisterAdminCount(today), getAllApiCount(), getAllRegisterUserCount(), getAllOrderCount(), getAllRegisterAdminCount()]).then((result) => {
        this.todayApiCount = result[0].data.count;
        this.todayUserCount = result[1].data.count;
        this.todayOrderCount = result[2].data.count;
        this.todayAdminCount = result[3].data.count;
        this.allApiCount = result[4].data.count;
        this.allUserCount = result[5].data.count;
        this.allOrderCount = result[6].data.count;
        this.allAdminCount = result[7].data.count;
      });
    },
    getSevenDay () {
      for (let i = 6; i > -1; i--) {
        this.sevenDay.push(dtime(new Date().getTime() - i * 86400000).format('YYYY-MM-DD'));
      }
    },
    getSevenData() {
      let apiArr = [[], [], [], []];
      this.sevenDay.forEach((item) => {
        apiArr[0].push(getTodayApiCount(item));
        apiArr[1].push(getTodayRegisterUserCount(item));
        apiArr[2].push(getTodayOrderCount(item));
        apiArr[3].push(getTodayRegisterAdminCount(item));
      });
      
      apiArr = [...apiArr[0], ...apiArr[1], ...apiArr[2], ...apiArr[3]];
      Promise.all(apiArr).then((result) => {
        result.forEach((item, index) => {
          if (item.data.status === 1) {
            this.sevenDate[Math.floor(index / 7)].push(item.data.count);
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#data-section {
  padding: 20px;
  margin-bottom: 40px;

  .header {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
  }
  .row {
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0px;
    }
  
   .data-box {
      border-radius: 6px;
      background-color: #e5e9f2;
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
      color: #666;
        
      &.today-data-header {
        background-color: #ff9800;
      }
      &.total-data-header {
        background-color: #20a0ff;
      }
      .data {
        font-size: 26px;
        color: #333;
      }
      .head {
        color: #fff;
        font-size: 24px;
      }
      .wan {
        color: #333;
        font-size: 16px;
      }
    }
  }
}
</style>

