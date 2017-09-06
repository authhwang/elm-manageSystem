<template>
  <div >
    <elm-header></elm-header>
    <div id="orderList">
      <el-table 
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      :row-key="row => row.index"
      :expand-row-keys="expandRow"
      @expand="handleExpand">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="用户名">
                {{props.row.user_name}}
              </el-form-item>
              <el-form-item label="店铺名称">
                {{props.row.restaurant_name}}
              </el-form-item>
              <el-form-item label="收货地址">
                {{props.row.address}}
              </el-form-item>
              <el-form-item label="店铺 ID">
                {{props.row.restaurant_id}}
              </el-form-item>
              <el-form-item label="店铺地址">
                {{props.row.restaurant_address}}
              </el-form-item>        
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
        label="订单 ID"
        prop="id">
        </el-table-column>
        <el-table-column
        label="总价格"
        prop="total_amount">
        </el-table-column>
        <el-table-column
        label="订单状态"
        prop="status_code">
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
import {getOrderList, getAllOrderCount, getOrderAddress, getRestaurantDetail, getUserInfo} from '@/common/js/common.js';
export default {
  data() {
    return {
      tableData: [],
      offset: 0,
      limit: 20,
      total: 0,
      expandRow: []
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
      getAllOrderCount().then((result) => {
        let data = result.data;
        if (data.status === 1) {
          this.total = data.count;
        }
      });

      getOrderList({limit: this.limit, offset: this.offset}).then((result) => {
        let data = result.data;
        console.log(data);
        let dataArr = [];
        data.forEach((item, index) => {
          let order = {};
          order.id = item.id;
          order.address_id = item.address_id;
          order.status_code = item.status_code === 0 ? '支付超时' : '支付成功';
          order.total_amount = item.total_amount;
          order.user_id = item.user_id;
          order.restaurant_name = item.restaurant_name;
          order.restaurant_id = item.restaurant_id;
          order.index = index;
          dataArr.push(order);
        });
        this.tableData = dataArr;
      });
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.initData();
    },
    handleExpand(row, expand) {
      if (expand) {
        this.getMoreDetail(row);
      } else {
        let index = this.expandRow.indexOf(row.index);
        this.expandRow.splice(index, 1);
      }
    },
    getMoreDetail(row) {
      Promise.all([getOrderAddress(row.address_id), getRestaurantDetail(row.restaurant_id), getUserInfo(row.user_id)]).then((result) => {
        let address = result[0].data;
        let restaurant = result[1].data;
        let user = result[2].data;
        let data = {...row, address: address.address, restaurant_address: restaurant.address, user_name: user.username};
        this.tableData.splice(row.index, 1, data);
        this.$nextTick(() => {
          this.expandRow.push(row.index);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#orderList {
  padding: 20px;

  .table-expand {
    font-size: 0;

    label {
       width: 90px;
       color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    } 
  }
}

</style>
