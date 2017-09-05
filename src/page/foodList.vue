<template>
  <div>
    <elm-header></elm-header>
    <div id="foodList">
      <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      :row-key="row => row.index"
      :expand-row-keys.sync="expandRow"
      @expand="handleExpand">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="食品名称">
                {{props.row.name}}
              </el-form-item>
              <el-form-item label="餐馆名称">
                {{props.row.restaurant_name}}
              </el-form-item>
              <el-form-item label="食品 ID">
                {{props.row.item_id}}
              </el-form-item>
              <el-form-item label="餐馆 ID">
                {{props.row.restaurant_id}}
              </el-form-item>
              <el-form-item label="食品介绍">
                {{props.row.description}}
              </el-form-item>
              <el-form-item label="餐馆地址">
                {{props.row.restaurant_address}}
              </el-form-item>
              <el-form-item label="食品评分">
                {{props.row.rating}}
              </el-form-item>
              <el-form-item label="食品分类">
                {{props.row.category_name}}
              </el-form-item>
              <el-form-item label="月销量">
                {{props.row.month_sales}}
              </el-form-item>             
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
        label="食品名称"
        prop="name">
        </el-table-column>
         <el-table-column
        label="食品介绍"
        prop="description">
        </el-table-column>
         <el-table-column
        label="食品评分"
        prop="rating">
        </el-table-column>
        <el-table-column
        label="操作"
        width="160">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
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
        <el-form label-width="100px" :model="selectRow">
          <el-form-item label="食品名称" >
            <el-input v-model="selectRow.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" >
            <el-input v-model="selectRow.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类">
            <el-select v-model="selectMenuIndex" :placeholder="selectMenu.label" @change="handleChange">
              <el-option
              v-for="item in allMenu"
              :key="item.value"
              :label="item.label"
              :value="item.index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商铺图片">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/food'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="selectRow.image_path" :src="dataImgUrl + selectRow.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div id="specTable">
          <el-table
          :data="specs"
          highlight-current-row
          style="width: 100%;margin-bottom: 20px;">
            <el-table-column
            label="规格"
            prop="specs">
            </el-table-column>
            <el-table-column
            label="包装费"
            prop="packing_fee">
            </el-table-column>
            <el-table-column
            label="价格"
            prop="price">
            </el-table-column>
            <el-table-column
            label="操作">
              <template scope="scope">
                <el-button size="small" type="danger" @click="handleDeleteSpec(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="handleAddSpec">添加规格</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirmDialog">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加规格" :visible.sync="dialogSpecFormVisible">
        <el-form label-width="100px" :model="newSpec" :rules="specRule">
          <el-form-item label="规格" prop="specs">
            <el-input v-model="newSpec.specs"></el-input>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number v-model="newSpec.packing_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="newSpec.price" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSpecComfirmDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import header from '@/components/header.vue';
import {getFoodList, getFoodCount, getRestaurantDetail, getCategoryDetail, getAllCategoryFromRestaurant, deleteFood, updateFood} from '@/common/js/common.js';
import {dataImgUrl, cangduUrl} from '@/config/config.js';
export default {
  components: {
    'elm-header': header
  },
  data() {
    return {
      tableData: [],
      expandRow: [],
      selectMenu: {},
      selectRow: {},
      allMenu: [],
      specRule: {
        specs: [
          {required: true, message: '请输入规格', trigger: 'blur'}
        ] 
      },
      newSpec: {
        specs: '',
        packing_fee: 20,
        price: 0
      },
      restaurant_id: null,
      selectMenuIndex: null,
      offset: 0,
      limit: 20,
      total: 0,
      dialogFormVisible: false,
      dialogSpecFormVisible: false,
      dataImgUrl,
      cangduUrl
    };
  },
  computed: {
    specs: function() {
      let specArr = [];
      if (this.selectRow.specfoods) {
        this.selectRow.specfoods.forEach((item) => {
          specArr.push({
            specs: item.specs_name,
            price: item.price,
            packing_fee: item.packing_fee
          });
        });
      }
      return specArr;
    }
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id; //这里的值虽然为undefined可是在后台筛选的时候是等于获取所有
    this.initData();
  },
  methods: {
    initData() {
      getFoodCount().then((result) => {
        let data = result.data;
        if (data.status === 1) {
          this.total = data.count;
        }
      });
      this.getFoodList();
    },
    getFoodList() {
      getFoodList({restaurant_id: this.restaurant_id, offset: this.offset, limit: this.limit}).then((result) => {
        let data = result.data;
        let dataArr = [];
        data.forEach((item, index) => {
          let food = {};
          food.name = item.name;
          food.restaurant_id = item.restaurant_id;
          food.description = item.description;
          food.rating = item.rating;
          food.item_id = item.item_id;
          food.month_sales = item.month_sales;
          food.specfoods = item.specfoods;
          food.index = index;
          food.image_path = item.image_path;
          food.category_id = item.category_id;
          dataArr.push(food);
        });
        this.tableData = dataArr;
      });
    },
    getFoodMoreDetail(row, type, callback) {
      Promise.all([getRestaurantDetail(row.restaurant_id), getCategoryDetail(row.category_id)]).then((result) => {
        let restaurant = result[0].data;
        let category = result[1].data;
        this.selectRow = {...row, ...{'restaurant_name': restaurant.name, 'restaurant_address': restaurant.address, 'category_name': category.name}};
        this.selectMenu = {value: row.category_id, label: category.name};
        this.tableData.splice(row.index, 1, {...this.selectRow});
        let index = this.expandRow.indexOf(row.index);
        console.log(this.expandRow);
        // if (index === -1) {
        this.$nextTick(() => {
          this.expandRow.push(row.index);  
        });
        // }

        if (type === 'edit') {
          getAllCategoryFromRestaurant(row.restaurant_id).then((result) => {
            let data = result.data;
            if (data.status) {
              let menuArr = [];
              data.category_list.forEach((item, index) => {
                menuArr.push({value: item.id, label: item.name, index});
              });
              this.allMenu = menuArr;
            }
          });
          callback();
        }
      });
    },
    handleEdit(index, row) {
      this.getFoodMoreDetail(row, 'edit', () => {
        this.dialogFormVisible = true;
      });
    },
    handleDelete(index, row) {
      deleteFood(row.item_id).then((result) => {
        let data = result.data;
        if (data.status === 1) {
          this.$message.success('删除食品成功');
          this.tableData.splice(index, 1);
          this.total -= 1;
          let rowIndex = this.expandRow.indexOf(index);
          if (rowIndex !== -1) {
            this.expandRow.splice(rowIndex, 1);
          }
        } else {
          this.$message.error(data.message);
        }
      });
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.initData();
    },
    handleExpand(row, expand) {      //当已经展开时 然后点击编辑 会有bug bug:不能收回 解决方法写在git
      this.expandRow = [...new Set(this.expandRow)];
      const index = this.expandRow.indexOf(row.index);

      console.log(expand);
      if (expand && index === -1) {
        this.getFoodMoreDetail(row);
      } else {
        console.log(index);
        this.expandRow.splice(index, 1);
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.status === 1) {
        this.selectRow.image_path = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
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
    handleChange(index) {
      this.selectMenuIndex = index;
      this.selectMenu = this.allMenu[index];
      console.log(this.allMenu);
    },
    handleAddSpec() {
      this.newSpec = {
        specs: '',
        packing_fee: 20,
        price: 0
      };
      this.dialogSpecFormVisible = true;
    },
    handleDeleteSpec(index) {
      this.specs.splice(index, 1);
    },
    handleSpecComfirmDialog() {
      let newSpec = {...this.newSpec};
      this.specs.push(newSpec);
      this.dialogSpecFormVisible = false;
    },
    handleComfirmDialog() {
      let data = {
        item_id: this.selectRow.item_id,
        name: this.selectRow.name,
        description: this.selectRow.description,
        image_path: this.selectRow.image_path,
        restaurant_id: this.selectRow.restaurant_id,
        category_id: this.selectRow.category_id,
        specs: this.specs,              //specfoods 文档是用这个但实际后台的是用specs
        new_category_id: this.selectMenu.value
      };
      updateFood(data).then((result) => {
        let data = result.data;
        this.dialogFormVisible = false;
        if (data.status) {
          this.$message.success('更新食品成功');
          this.getFoodList();
        } else {
          this.$message.error(data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#foodList {
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

  #specTable {
    text-align: center;
  }
}
</style>

