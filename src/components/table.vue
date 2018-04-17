<template>
<div>
  <el-input placeholder="姓名" style="width:200px;"></el-input>
  <el-button type="primary">搜索</el-button>
  <el-table class="mt20" ref="multipleTable" tooltip-effect="dark" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
    <el-table-column type="index" prop="id" label="序号" align="center" :index="typeIndex"></el-table-column>
    <el-table-column type="selection" width="55"></el-table-column>
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

<script>
export default {
  name: "Table",
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      loading: true,
      url: "123",
      tableData: [
        {
          date: "2016-05-05",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎5",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎6",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎7",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎8",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-09",
          name: "王小虎9",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-10",
          name: "王小虎10",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-11",
          name: "王小虎11",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(row);
    },
    //删除当前行
    handleDelete(index, row) {
      this.$confirm("删除用户 " + row.name + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向请求服务端删除
          var resource = this.$resource(this.url + "{/name}");
          resource
            .delete({ name: user.name })
            .then(response => {
              this.$message.success("成功删除了用户" + user.name + "!");
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
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
