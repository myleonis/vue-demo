~~~
<template>
  <div class="defect-top-list">
    <el-tabs v-model="TabsActiveName"
             :stretch="true">
      <el-tab-pane label="焊装"
                   name="first">
        <div class="h-table">
          <div class="h-row">
            <div class="h-td h-td0 h-th">TOP</div>
            <div class="h-td h-td1 h-th">问题描述</div>
            <div class="h-td h-th">数量</div>
            <div class="h-td h-th">分析</div>
          </div>
          <div class="h-row"
               v-for="(item, index) in data.A.ZH.D.slice(0,20)"
               :key="index">
            <div class="h-td h-td0">{{index + 1}}</div>
            <div class="h-td h-td1">{{item.position + item.defectDes}}</div>
            <div class="h-td">{{item.defectNum}}</div>
            <div class="h-td">分析</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="涂装"
                   name="second">
        <div class="h-table">
          <div class="h-row">
            <div class="h-td h-td0 h-th">TOP</div>
            <div class="h-td h-td1 h-th">问题描述</div>
            <div class="h-td h-th">数量</div>
            <div class="h-td h-th">分析</div>
          </div>
          <div class="h-row"
               v-for="(item, index) in data.B.ZH.D.slice(0,20)"
               :key="index">
            <div class="h-td h-td0">{{index + 1}}</div>
            <div class="h-td h-td1">{{item.position + item.defectDes}}</div>
            <div class="h-td">{{item.defectNum}}</div>
            <div class="h-td">分析</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="总装"
                   name="third">
        <div class="h-table">
          <div class="h-row">
            <div class="h-td h-td0 h-th">TOP</div>
            <div class="h-td h-td1 h-th">问题描述</div>
            <div class="h-td h-th">数量</div>
            <div class="h-td h-th">分析</div>
          </div>
          <div class="h-row"
               v-for="(item, index) in data.C.ZH.D.slice(0,20)"
               :key="index">
            <div class="h-td h-td0">{{index + 1}}</div>
            <div class="h-td h-td1">{{item.position + item.defectDes}}</div>
            <div class="h-td">{{item.defectNum}}</div>
            <div class="h-td">分析</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import componentVue from "@/core/component";
import { PQ_ALL_WORKSHOP_TOP } from "@/store/action-types";
import { mapState } from "vuex";

export default {
  name: "defect-top-list",
  data() {
    return {
      TabsActiveName: "third"
    };
  },
  mixins: [componentVue],
  computed: {
    ...mapState({ data: state => state.pq.workshopTopAll })
  },
  mounted() {
    this.dispatch({
      [PQ_ALL_WORKSHOP_TOP]: {
        params: [
          {
            grade: "综合",
            num: 20,
            sumType: "D",
            workshopCode: "A"
          },
          {
            grade: "综合",
            num: 20,
            sumType: "D",
            workshopCode: "B"
          },
          {
            grade: "综合",
            num: 20,
            sumType: "D",
            workshopCode: "C"
          }
        ]
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.defect-top-list {
  padding: 0.1rem;
  font-size: 0.14rem;
  height: 5.1rem;
  overflow: hidden;
  .h-table {
    .h-row {
      display: table;
      width: 100%;
      border-bottom: 0.01rem solid #f0f0f0;
    }
    .h-td.h-th {
      background: #f3f3f3;
      color: #616161;
      font-weight: bold;
      font-size: 0.14rem;
      height: 0.3rem;
    }
    .h-td.h-td1 {
      width: auto;
      text-align: left;
    }
    .h-td.h-td0 {
      width: 12%;
    }
    .h-td {
      height: 0.405rem;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      color: #616161;
      text-align: center;
      font-size: 0.14rem;
      overflow: hidden;
      width: 14%;
    }
  }
}

.full-screen {
  .defect-top-list {
    height: 7rem;
    .h-td {
      height: 0.4rem;
    }
  }
}
</style>

<style lang="scss">
.defect-top-list {
  .el-tabs__header {
    margin-bottom: 0.05rem;
  }
}
</style>
~~~

