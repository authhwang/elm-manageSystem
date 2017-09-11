<template>
  <div>
    <elm-header></elm-header>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form-header">选择食品种类</header>
        <el-form label-width="110px" class="form">
          <el-row class="category-select">
            <el-form-item label="食品种类">
              <el-select placeholder="请选择" style="width: 100%;">
                <el-option 
                v-for="item in categoryOption"
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
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="种类描述">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="category-button" @click="handleAddCategory">
            <i class="el-icon-caret-top" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom" v-else></i>
            <span>添加食品种类</span>
          </div>
        </el-form>

        <header class="form-header">添加食品</header>
        <el-form label-width="110px" class="add-food-form" ref="foodForm" :data="foodForm">
          <el-form-item label="食品名称" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="食品活动">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="食品详情">
            <el-input></el-input>
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
            <el-select placeholder="请选择" multiple>
                <el-option 
                v-for="item in foodForm.attributes"
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
              <el-input-number  :min="0" :max="20"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number  :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-row>
          <el-row v-else>
          </el-row>
          <div class="form-comfirm-button">
            <el-button type="primary" >确认添加食品</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import header from '@/components/header.vue';
import {cangduUrl, dataImgUrl} from '@/config/config.js';
export default {
  components: {
    'elm-header': header
  },
  data() {
    return {
      showAddCategory: false,
      cangduUrl,
      foodForm: {},
      foodSpecs: '1'
    };
  },
  methods: {
    handleAddCategory() {
      this.showAddCategory = !this.showAddCategory;
    },
    beforeAvatarUpload() {

    },
    handleAvatarSuccess() {

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