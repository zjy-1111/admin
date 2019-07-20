<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input :show-password="true" type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`admin/${this.id}`, this.model);
      } else {
        res = await this.$http.post("admin", this.model);
      }
      this.$router.push("/admin/list");
        if (res.data.msg == "用户已存在") {
          this.$message({
            type: "error",
            message: "用户名已存在"
          });
        } else {
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
    },
    async fetch() {
      const res = await this.$http.get(`admin/${this.id}`);
      this.model = res.data.data.admin;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
