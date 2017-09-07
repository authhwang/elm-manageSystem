<template>
  <div>
    <elm-header></elm-header>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form label-width="110px">
          <el-form-item label="店铺名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-autocomplete placeholder="请输入地址" style="width: 100%"></el-autocomplete>
            <span>当前城市: 广州</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="店铺简介">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="店铺标语">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              :options="options"
              change-on-select
              v-model="currentShopCategory">
            </el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span>品牌保证 </span><el-switch on-text="" off-text=""></el-switch>
            <span>蜂鸟专送 </span><el-switch on-text="" off-text=""></el-switch>
            <span>新开店铺 </span><el-switch on-text="" off-text=""></el-switch>
          </el-form-item>
          <el-form-item>
            <span>外卖保 </span><el-switch on-text="" off-text=""></el-switch>
            <span>准时达 </span><el-switch on-text="" off-text=""></el-switch>
            <span>开发票 </span><el-switch on-text="" off-text=""></el-switch>
          </el-form-item>
          <el-form-item label="配送费">
             <el-input-number  :min="0" :max="20"></el-input-number>
          </el-form-item>
           <el-form-item label="起送费">
             <el-input-number  :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-select :picker-options="picker-options" placeholder="起始时间"></el-time-select>
            <el-time-select :picker-options="picker-options" placeholder="结束时间"></el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formData.shop_avatar" :src="dataImgUrl + formData.shop_avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleBussinessLicenseSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formData.shop_bussinesslicense" :src="dataImgUrl + formData.shop_bussinesslicense" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <el-upload
            class="avatar-uploader"
            :action="cangduUrl + 'v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleRestaurantServiceLicenseSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formData.shop_servicelicense" :src="dataImgUrl + formData.shop_servicelicense" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
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
      currentShopCategory: [],
      'picker-options': {
        start: '05:30',
        step: '00:15',
        end: '23:30'
      },
      cangduUrl,
      dataImgUrl,
      formData: {}
    };
  },
  methods: {
    beforeAvatarUpload(file) {

    },
    handleAvatarSuccess(file, res) {

    },
    handleBussinessLicenseSuccess(file, res) {

    },
    handleRestaurantServiceLicenseSuccess(file, res) {
      
    }

  }
};
</script>

<style lang="less">
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
</style>
