<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}医生</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="姓名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input :show-password="true" type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="this.$http.defaults.baseURL + 'upload_image'"
          accept="image/jpeg, image/png"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top: 1rem;">
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
      imageUrl: "",
      model: {
        userType: "2",
        avatar: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.model.avatar = res.data.url;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`user/${this.id}`, this.model);
      } else {
        res = await this.$http.post("user", this.model);
      }
      this.$router.push("/doctor/list");
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
      const res = await this.$http.get(`user/${this.id}`);
      this.model = Object.assign({}, this.model, res.data.data.user);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>
