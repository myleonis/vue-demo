<template>
  <div class="MainLayout" style="width: 100%;height: 100%">
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item, index) in routerList" :key="index + item" index="0" v-show="item.path !== '/'">
            <router-link :to="item.path">{{item.name}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!--此处的路由对应router的children中的component（即第二层），第一层的component对应的是App.vue中的router-view-->
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      isCollapse: true,
      routerList: []
    }
  },
  computed: {
    ...mapGetters(['permissionRouters'])
  },
  mounted () {
    //this.routerList = this.permissionRouters[0].children;
    const oneRouterLen = this.permissionRouters.length;
    for(let i = 0;i<oneRouterLen;i++) {
      this.routerList = this.routerList.concat(this.permissionRouters[i].children)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .MainLayout {
    height: 100%;
    width: 250px;
  }
</style>
