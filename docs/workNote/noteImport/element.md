# el-table

## 常用技巧

### 1. table表自定义显示

~~~html
<el-table-column
          align="center"
          property="status"
          label="状态"
          width="110">
	<template slot-scope="scope">
		<span v-if="scope.row.status === 1" style="color:red" >停用</span>
		<span v-else-if="scope.row.status === 0" >正常</span>
	</template>
</el-table-column>
~~~

## el-select

~~~
<el-select placeholder="年度"
                   size="small"
                   style="width:88px"
                   clearable
                   v-model="options.year">
          <el-option key="0"
                     label="所有年份"
                     value />
          <el-option :key="y"
                     :label="y"
                     :value="y"
                     v-for="y in years" />
        </el-select>
~~~

## vue使用技巧

~~~html
<el-button @click="dialogFormVisible = false" size="small">{{$t('user.cancel')}}</el-button>
        <el-button
          @click="$refs['tmpUser'].resetFields()"
          size="small"
          v-if="dialogStatus === 'add'"
        >{{$t('user.reset')}}</el-button>
        <el-button
          :loading="btnLoading"
          @click.native.prevent="addUser"
          size="small"
          type="primary"
          v-if="dialogStatus === 'add'"
        >{{$t('user.add')}}</el-button>
        <el-button
          :loading="btnLoading"
          @click.native.prevent="updateUserRole"
          type="primary"
          size="small"
          v-else
        >{{$t('user.update')}}</el-button>
~~~

