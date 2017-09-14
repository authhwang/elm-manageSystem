<template>
  <div>
    <elm-header></elm-header>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form-header">选择食品种类</header>
        <el-form label-width="110px" class="form" :model="categoryForm">
          <el-row class="category-select">
            <el-form-item label="食品种类">
              <el-select  style="width: 100%;" v-model="categoryForm.categorySelect" placeholder="请选择">
                <el-option 
                v-for="item in categoryForm.categoryList"
                :key="item.value"
                :value="item.value"
                :label="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="hidden-input" :class="showAddCategory ? 'show-input' : ''" >
            <div class="category-input">
               <el-form-item label="食品种类">
                <el-input v-model="categoryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAddCategory">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="category-button" @click="handleShowAddCategory">
            <i class="el-icon-caret-top" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom" v-else></i>
            <span>添加食品种类</span>
          </div>
        </el-form>

        <header class="form-header">添加食品</header>
        <el-form label-width="110px" class="add-food-form form" ref="foodForm" :model="foodForm"  :rules="foodRules" >
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="食品活动">
            <el-input v-model="foodForm.activity"></el-input>
          </el-form-item>
          <el-form-item label="食品详情">
            <el-input v-model="foodForm.description"></el-input>
          </el-form-item>
          <el-form-item label="上传食品图片">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/food'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="foodForm.image_path" :src="dataImgUrl + foodForm.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="食品特点">
            <el-select placeholder="请选择" multiple v-model="foodForm.attributes">
                <el-option 
                v-for="item in attributes"
                :key="item.value"
                :value="item.value"
                :label="item.label">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="食品规格">
              <el-radio class="radio" v-model="foodSpecs" label="1">单规格</el-radio>
              <el-radio class="radio" v-model="foodSpecs" label="2">多规格</el-radio>
          </el-form-item>
          <el-row v-if="foodSpecs === '1'">
            <el-form-item label="包装费">
              <el-input-number  :min="0" :max="20" v-model="foodForm.specs[0].packing_fee"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number  :min="0" :max="100" v-model="foodForm.specs[0].price"></el-input-number>
            </el-form-item>
          </el-row>
          <el-row v-else>
            <el-table :data="foodForm.specs" highlight-current-row style="margin-bottom: 10px;">
              <el-table-column prop="specs" label="规格">
              </el-table-column>
              <el-table-column prop="packing_fee" label="包装费">
              </el-table-column>
              <el-table-column prop="price" label="价格">
              </el-table-column>
              <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" type="danger" @click="handleDeleteSpec(scope.$index)">删除</el-button>
              </template>
              </el-table-column>
            </el-table>
            <div class="form-comfirm-button">
              <el-button type="primary" @click="handleAddSpec">添加规格</el-button>
            </div>
          </el-row>
          <div class="form-comfirm-button">
            <el-button type="primary" @click="handleAddFood('foodForm')">确认添加食品</el-button>
          </div>
        </el-form>
        <el-dialog title="添加规格" :visible.sync="dialogSpecFormVisible">
        <el-form label-width="100px" :model="newSpec" :rules="specRule" ref="specForm">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import header from '@/components/header.vue';
import {cangduUrl, dataImgUrl} from '@/config/config.js';
import {getAllCategoryFromRestaurant, addCategory, addFood} from '@/common/js/common.js';
export default {
  components: {
    'elm-header': header
  },
  data() {
    return {
      showAddCategory: false,
      cangduUrl,
      dataImgUrl,
      categoryForm: {
        categoryList: [],
        categorySelect: '',
        name: '',
        description: '',
      },
      foodForm: {
        name: '',
        image_path: '',
        specs: [{
          specs: '默认',
          packing_fee: 0,
          price: 20
        }],
        description: '',
        activity: '',
        attributes: []
      },
      foodRules: {
        name: [
          {required: true, message: '请输入食品名称', trigger: 'blur'}
        ]
      },
      foodSpecs: '1',
      restaurant_id: 1,
      attributes: [{
        value: '新',
        label: '新品'
      },
      {
        value: '招',
        label: '招牌'
      }],
      dialogSpecFormVisible: false,
      newSpec: {
        specs: '',
        packing_fee: 0,
        price: 20
      },
      specRule: {
        specs: [
          {required: true, message: '请输入规格', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    selectCategory() {
      return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {};
    }
  },
  created() {
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id;
    } else {
      // this.restaurant_id = Math.ceil(Math.random() * 10);
      this.restaurant_id = 2;
      this.$msgbox({
        title: '提示',
        message: '添加食品需要选择一个商铺，先去就去选择商铺吗?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$router.push('/shopList');
            done();
          } else {
            this.$message.info('取消');
            done();
          }
        }
      }).catch(() => {

      });
    }
    this.initData();
  },
  methods: {
    initData() {
      getAllCategoryFromRestaurant(this.restaurant_id).then((result) => {
        let data = result.data;
        if (data.status) {
          let menuArr = [];
          data.category_list.forEach((item, index) => {
            menuArr.push({value: index, label: item.name});
          });
          this.categoryForm.categoryList = menuArr;
        }
      }).catch((error) => {
        this.$message.info('网络错误');
      });
    },
    handleShowAddCategory() {
      this.showAddCategory = !this.showAddCategory;
    },
    handleAddCategory() {
      let data = {name: this.categoryForm.name, description: this.categoryForm.description, restaurant_id: this.restaurant_id};
      addCategory(data).then((result) => {
        result = result.data;
        if (result.status === 1) {
          this.initData();
          this.categoryForm.name = '';
          this.categoryForm.description = '';
          this.showAddCategory = false;
          this.$message.success('增加食品种类成功');
        } else {
          this.$message.error(result.message);
        }
      }).catch((error) => {
        this.$message.info('网络错误');
      });
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
    handleAvatarSuccess(file, res) {
      res = res.response;
      if (res.status === 1) {
        this.foodForm.image_path = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    handleDeleteSpec(index) {
      this.foodForm.specs.splice(index, 1);
    },
    handleAddSpec() {
      this.dialogSpecFormVisible = true;
    },
    handleSpecComfirmDialog() {
      this.foodForm.specs.push({...this.newSpec});
      this.newSpec = {
        specs: '',
        packing_fee: 0,
        price: 20
      };
      this.dialogSpecFormVisible = false;
    },
    handleAddFood(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {...this.foodForm, category_id: this.selectCategory.value, restaurant_id: this.restaurant_id};
          addFood(data).then((result) => {
            result = result.data;
            if (result.status === 1) {
              this.foodForm = {
                name: '',
                image_path: '',
                specs: [{
                  specs: '默认',
                  packing_fee: 0,
                  price: 20
                }],
                description: '',
                activity: '',
                attributes: []
              };
              this.$message.success('增加食品成功');
            } else {
              this.$message.error(result.message);
            }
          }).catch((error) => {
            this.$message.info('网络错误');
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: '请检查输入是否正确',
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.form-header {
  text-align: center;
  margin-bottom: 10px;
}
.form {
  margin-bottom: 30px;
  min-width: 400px;
  transition: all 0.4s ease;
  border-radius: 6px;

  &:hover {
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  }
}
.category-select {
  padding: 10px 30px 10px 10px;
  border: 1px solid #eaeefb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.hidden-input {
  height: 0;
  overflow: hidden;
  transition: all 0.4s ease;
}
.show-input {
  height: 185px;
}
.category-input {
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
  background: #f9fafc;
}
.category-button {
  color: #999;
  text-align: center;
  line-height: 40px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  font-size: 14px;
  transition: all 0.4s ease;

  span, i{
    transition: all 0.4s ease;
  }

  &:hover {
    background: #f9fafc;

    span, i {
      color: #20a0ff;
    }
  }
}
.add-food-form {
  min-width: 400px;
  padding: 10px 30px 0 10px;
  border: 1px solid #eaeefb;
  transition: all 0.4s ease;

  &:hover {
    border-radius: 6px;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
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
.form-comfirm-button {
  text-align: center;
  margin-bottom: 10px;
}

</style>