<template>
  <div>
    <h1>医生列表</h1>
    <el-table :data="items">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <div class="demo-type">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="$router.push(`/doctor/edit/${scope.row.id}`)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="remove(scope.row)"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="5"
      :total="total"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      items: []
    };
  },
  methods: {
    async fetch(currentPage) {
      const res = await this.$http.get(`users/2?page=${currentPage}`);
      this.items = res.data.data.items;
      this.total = res.data.data.total;
    },
    remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`user/${row.id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    current_change: function(currentPage) {
      this.fetch(currentPage);
    }
  },
  created() {
    this.fetch(1);
  }
};
</script>

