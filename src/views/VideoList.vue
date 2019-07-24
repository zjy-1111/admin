<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="items">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="video_url" label="视频url">
        <template slot-scope="scope">
        <el-link :underline="false" :href="scope.row.video_url" target="_blank">{{ scope.row.video_url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="视频详情" width="300">
        <template slot-scope="scope">
        <div style="width:300px;height:150px;">
          <video  class="video-js" controls style="object-fit: fill;">
            <source :src="scope.row.video_url" type="video/mp4" />
          </video>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("api/v1/training_videos");
      this.items = res.data.data.items;
    },
    remove(row) {
      this.$confirm(`是否确定要删除视频`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`api/v1/training_video/${row.id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
