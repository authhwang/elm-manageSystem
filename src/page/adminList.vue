<template>
  <div>
    <elm-header></elm-header>
    <div id="adminList">
      <el-table 
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      >
        <el-table-column
        label="姓名"
        prop="user_name">
        </el-table-column>
        <el-table-column
        label="注册日期"
        prop="create_time">
        </el-table-column>
        <el-table-column
        label="地址"
        prop="city">
        </el-table-column>
         <el-table-column
        label="权限"
        prop="admin">
        </el-table-column>
      </el-table>
      <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :page-size="limit"
      @current-change="handleCurrentChange"
      style="margin-top: 10px;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import header from '@/components/header';
import {getAdminList, getAllRegisterAdminCount} from '@/common/js/common.js';
export default {
  data() {
    return {
      tableData: [],
      offset: 0,
      limit: 20,
      total: 0,
    };
  },
  components: {
    'elm-header': header
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getAllRegisterAdminCount().then((result) => {
        let data = result.data;
        if (data.status === 1) {
          this.total = data.count;
        }
      }).catch((error) => {
        this.$message.info('网络错误');
      });

      this.fetchAdminList();
    },
    fetchAdminList() {
      getAdminList({limit: this.limit, offset: this.offset}).then((result) => {
        let data = result.data.data;
        console.log(result);
        let dataArr = [];
        data.forEach((item, index) => {
          let admin = {};
          admin.admin = item.admin;
          admin.city = item.city;
          admin.create_time = item.create_time;
          admin.user_name = item.user_name;
          dataArr.push(admin);
        });
        this.tableData = dataArr;
      }).catch((error) => {
        this.$message.info('网络错误');
      });
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
#adminList {
  padding: 20px;
}
</style>
