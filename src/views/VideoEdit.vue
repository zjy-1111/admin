<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="视频" prop="video">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="this.$http.defaults.baseURL + 'upload_video'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :file-list="fileList"
          :auto-upload="false"
          :before-remove="beforeRemove"
          multiple
          :limit="10"
          :on-exceed="handleExceed"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="this.$http.defaults.baseURL + 'upload_image'"
          accept="image/jpeg, image/png"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
        >
          <img v-if="coverUrl" :src="coverUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      coverUrl: "",
      model: {}
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadSuccess(res) {
      this.model.video_url = res.data.video_url;
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleCoverSuccess(res, file) {
      this.model.coverUrl = res.data.url;
      this.coverUrl = URL.createObjectURL(file.raw);
    },
    beforeCoverUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`api/v1/trainning_video/${this.id}`, this.model);
      } else {
        res = await this.$http.post("api/v1/training_video", this.model);
      }
      this.$router.push("/video/list");
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
      const res = await this.$http.get(`api/v1/training_video/${this.id}`);
      this.model = res.data.data.video;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
