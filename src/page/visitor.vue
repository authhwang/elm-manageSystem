<template>
  <div>
    <elm-header></elm-header>
    <pie :visitorList="userList"></pie>
  </div>
</template>

<script>
import header from '@/components/header';
import visitorPie from '@/components/visitorPie';
import {getUserCityCount} from '@/common/js/common.js';
export default {
  components: {
    'elm-header': header,
    pie: visitorPie
  },
  data() {
    return {
      userList: []
    };
  },
  activated() {
    this.initData();
  },
  methods: {
    initData() {
      getUserCityCount().then((result) => {
        result = result.data;
        if (result.status === 1) {
          this.userList = result.user_city;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>
