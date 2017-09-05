<template>
  <div>
    <elm-header></elm-header>
    <div id="shopList">
      <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%">
       <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.recent_order_num }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
       <el-table-column
      label="店铺名称"
      prop="name">
     </el-table-column>
     <el-table-column
      label="店铺地址"
      prop="address">
     </el-table-column>
     <el-table-column
      label="店铺介绍"
      prop="description">
     </el-table-column>
      <el-table-column
      label="操作"
      width="200">
        <template scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleAddFood(scope.$index, scope.row)">添加食品</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :page-size="limit"
      @current-change="handleCurrentChange"
      style="margin-top: 10px;">
      </el-pagination>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form label-width="100px" :model="currentShop">
          <el-form-item label="店铺名称" >
            <el-input v-model="currentShop.name" auto-complete= "false"></el-input>
          </el-form-item>
           <el-form-item label="详细地址">
            <el-autocomplete v-model="address.address" placeholder="请输入地址" :fetch-suggestions="querySearchAsync" @select="handleSelect" style="width: 100%;"></el-autocomplete>
            <span>当前城市: {{city.name}}</span>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <el-input v-model="currentShop.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="currentShop.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              :options="options"
              change-on-select
              v-model="currentShopCategory">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商铺图片">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="currentShop.image_path" :src="dataImgUrl + currentShop.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirmDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import header from '@/components/header';
import {getRestaurantCount, guessPlace, getShopList, getAllCategory, searchPlace, updateRestaurant, deleteRestaurant} from '@/common/js/common.js';
import {cangduUrl, dataImgUrl} from '@/config/config.js';
export default {
  data () {
    return {
      cangduUrl,
      dataImgUrl,
      tableData: [],
      limit: 20,
      offset: 0,
      total: 0,
      city: {},
      dialogFormVisible: false,
      currentShop: {},
      options: [],
      currentShopCategory: [],
      address: {}
    };
  },
  components: {
    'elm-header': header
  },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      guessPlace().then((result) => {
        this.city = result.data;
        this.getRestaurantList();
      });
      getRestaurantCount().then((result) => {
        console.log(result);
        let data = result.data;
        if (data.status === 1) {
          this.total = data.count;
        }
      });
      getAllCategory().then((result) => {
        console.log(result.data);
        let data = result.data;
        let dataArr = [];
        data.forEach((item, index) => {
          if (!item.sub_categories.length > 0) {
            return;
          }
          let category = {};
          if (item.sub_categories.length > 0) {
            category.children = [];
            item.sub_categories.forEach((childrenItem, childrenindex) => {
              if (childrenItem.level === 1) {
                return;
              }
              category.children.push({
                value: childrenItem.name,
                label: childrenItem.name
              });
            });
          }
          category.value = item.name;
          category.label = item.name;
          dataArr.push(category);
        });
        this.options = dataArr;
      });
    },
    getRestaurantList() {
      getShopList({latitude: this.city.latitude, longitude: this.city.longitude, offset: this.offset, limit: this.limit}).then((result) => {
        console.log(result);
        let dataArr = result.data;
        let shopList = [];
        dataArr.forEach((item, index) => {
          let data = {};
          data.name = item.name;
          data.phone = item.phone;
          data.address = item.address;
          data.description = item.description;
          data.id = item.id;
          data.rating = item.rating;
          data.recent_order_num = item.recent_order_num;
          data.category = item.category;
          data.image_path = item.image_path;
          data.category = item.category;
          shopList.push(data);
        });
        this.tableData = shopList;
      });
    },
    handleEdit(index, row) {
      this.currentShop = row;
      this.address.address = row.address;
      this.currentShopCategory = row.category.split('/');
      this.dialogFormVisible = true;
    },
    handleAddFood(index, row) {
      //TODO 跳转添加食品
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      deleteRestaurant(row.id).then((result) => {
        if (result.data.status === 1) {
          this.$message.success('删除商铺成功');
          this.tableData.splice(index, 1);
          this.total -= 1;
        } else {
          this.$message.error(result.data.message);
        }
      });
    },
    handleCurrentChange(value) {
      this.offset = (value - 1) * this.limit;
      this.getRestaurantList();
    },
    querySearchAsync(queryString, cb) {
      searchPlace({keyword: queryString, city_id: this.city.id}).then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          cb(result.data);
        } else {
          console.log(result);
          cb([]);
        }
      });
    },
    handleSelect(item) {
      const {address, latitude, longitude} = item;
      this.address = {address, latitude, longitude};
    },
    beforeAvatarUpload(file) {
      let isRightType = file.type === 'image/jpeg' || file.type === 'image/png';
      let isRightSize = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }

      if (!isRightSize) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isRightSize && isRightType;
    },
    handleAvatarSuccess(res, file) {
      if (res.status === 1) {
        this.currentShop.image_path = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    handleComfirmDialog(value) {
      Object.assign(this.currentShop, this.address);
      this.currentShop.category = this.currentShopCategory.join('/');
      updateRestaurant(this.currentShop).then((result) => {
        if (result.data.status === 1) {
          this.$message.success('修改商铺信息成功');
        } else {
          this.$message.error(result.data.message);
        }
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#shopList {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>

