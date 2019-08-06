<template>
  <div class="el-table-test">
    <el-table
      :data="tableData3"
      style="width: 100%">
      <el-table-column
        label="医疗机构"
        align="right"
        width="150">
        <el-table-column
          prop="name"
          label="收费项目"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        v-for="(item,index) of mechanism"
        :label="item"
        align="center"
        :key="item"
        width="120">
        <el-table-column
          label="次数"
          align="center"
          width="120">
          <template slot-scope="scope">
            {{scope.row.mechanism[index].frequency}}
          </template>
        </el-table-column>
        <el-table-column
          label="费用"
          align="center"
          width="120">
          <template slot-scope="scope">
            {{scope.row.mechanism[index].cost}}
          </template>
        </el-table-column>
      </el-table-column>

    </el-table>

  </div>
    
</template>

<script>
export default {
  name: "elTableTest",
  data() {
    return {
      mechanism: ['医疗机构A', '医疗机构B', '医疗机构C', '医疗机构D'],
      tableData3: [
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        }
      ]
    }
  },

}
</script>

<style scoped>
  .el-table-test {
    width: 100%;
    height: 100%;
  }
  .el-table thead.is-group th {
    background: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type {
    border-bottom: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-53deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
  .el-table thead.is-group tr:last-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-54deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
  // background:red;
  }

</style>
