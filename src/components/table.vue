<template>
<div>
  <el-input placeholder="姓名" style="width:200px;"></el-input>
  <el-button type="primary">搜索</el-button>
  <div class="mt20">
    <el-button type="success" icon="el-icon-plus">添加用户</el-button>
    <el-button type="danger" icon="el-icon-delete" :disabled="selected.length==0">批量删除</el-button>
  </div>
  <el-table ref="multipleTable" class="mt20" tooltip-effect="dark" @selection-change="selectedChange" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" prop="id" label="序号" align="center" :index="typeIndex"></el-table-column>
    <el-table-column prop="date" label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" sortable>
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="province" label="省份"></el-table-column>
    <el-table-column prop="city" label="市区"></el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    <el-table-column prop="zip" label="邮编"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="mt20 align-center" 
        background 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      loading: true,
      selected: [], //已选中
      url: "http://60.205.231.165:8777/b35dcc1fd21acdc789fc/testone/name",
      tableData: []
    };
  },
  mounted: function() {
    this.getTable();
  },
  methods: {
    selectedChange(val) {
      this.selected = val;
    },
    handleEdit(index, row) {
      console.log(row);
    },
    // 获取table
    getTable: function() {
      this.$http
        .get(this.url)
        .then(response => {
          this.tableData = response.data;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //删除当前行
    handleDelete(index, row) {
      this.$confirm("删除用户 " + row.name + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向请求服务端删除
          var resource = this.$resource(
            "http://60.205.231.165:8777/b35dcc1fd21acdc789fc/deleteItem" +
              "{?id}"
          );
          resource
            .delete({ id: row.id })
            .then(response => {
              this.$message.success("成功删除了用户" + row.name + "!");
              this.tableData.splice(index, 1);
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    //批量删除
    // s
    //序号
    typeIndex(index) {
      return index + (this.currentPage - 1) * 10 + 1;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.align-center {
  text-align: center;
}
</style>
