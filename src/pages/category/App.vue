<template>
  <div class="category">
    <top-bar></top-bar>
    <div class="category-wrap">
  <!--    <van-badge-group class="cap-taglist-nav" :active-key="activeKey">
        <van-badge
          v-for="(nav, index) in routerNav"
          :key="index"
          :title="nav.name"
          @click="onClick"
        />
      </van-badge-group>-->

      <van-tabs  @click="onClick">
        <van-tab
        v-for="(nav, index) in routerNav"
        :key="index"
        :title="nav.name"
        />
      </van-tabs>

      <router-view>
        <img slot="banner" v-if="getBanner.isShow" class="category-banner" :src="getBanner.bannerBg" />
      </router-view>
    </div>
    <nav-bar active="category"></nav-bar>
  </div>
</template>
<script>
  import TopBar from '@/components/top-bar';
  import NavBar from '@/components/nav-bar';

  export default {
    name: 'category',

    data() {
      return {
        active: 0
      };
    },

    props: {
      routerNav: Array
    },

    components: {
      TopBar,
      NavBar
    },

    computed: {
      getBanner() {
        const { showBanner, banner } = this.routerNav[this.active]
        console.log('showBanner, banner', showBanner, banner)
        return {
          isShow: showBanner,
          bannerBg: banner
        }
      }
    },

    methods: {
      onClick(key) {
        this.active = key;
        const { name, type } = this.routerNav[key];
        if (type === 'recommend') {
          console.log('recommend ===>');
          this.$router.replace({ path: '/recommend', query: { name: '推荐' }});
        } else {
          console.log('capTaglist ===>');
          this.$router.replace({ path: `/capTaglist/${type}`, query: { name }});
        }
      }
    },

    created() {
      const name = this.$route.query.name;
      let activeIndex = 0;
      console.log(this.$route)
      this.routerNav.forEach((item, index) => {
        if (item.name === name) {
          activeIndex = index;
        }
      });
      this.onClick(activeIndex);
    }
  };
</script>
<style lang="postcss">
  .category {
    .top-bar {
      padding: 10px 13px;
      > img, .top-bar__yuanbao ,.top-bar_messagebox{
        display: none;
      }
    }
  }
  .category-wrap {
    position: relative;
    background-color: #f2f2f2;
    height: calc(100vh - 107px);
    overflow: hidden
  }
  .category-banner {
    width: 100%;
  }
  .cap-taglist-nav {
    top: 0;
    left: 0;
    width: 80px;
    overflow-y: auto;
    position: absolute;
    background-color: #f2f2f2;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 55px;
    height: calc(100vh - 48px);
    overflow: auto;
  }
  .captaglist {
    height: calc(100vh - 140px);
    overflow: auto;
  }
  .van-tab--active{
   color:#C4D52F;
  }
  .van-tabs__nav-bar{
    background:#C4D52F;
    width:20px !important;
    margin-left:35px;
  }
  .van-badge--select {
    color: #FF3536;
    &::before {
      content: '';
      position: absolute;
      top: 19px;
      left: 0;
      width: 4px;
      height: 20px;
      pointer-events: none;
      background-color: #EE4F4F;
    }
  }
  .van-badge {
    text-align: center;
    padding: 20px 12px;
    border-left: 0;
    &::after {
      content: none;
    }
  }
</style>
