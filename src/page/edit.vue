<template>
  <div>
    <elm-header></elm-header>
    <div class="container">
      <quill-editor v-model="content" @ready="onEditorReady($event)" class="editor">
      </quill-editor>
    </div>
    <div class="button">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import header from '@/components/header';
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    'elm-header': header,
    'quill-editor': quillEditor
  },
  data() {
    return {
      content: '<h3>I am Example</h3>'
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log('editor ready!', editor);
    },
    handleSubmit() {
      this.$message.success('提交成功');
      this.content = '';
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 40px;
  margin-bottom: 20px;
}
.editor {
  height: 350px;
}
.button {
  text-align: center;
  margin-top: 40px;
}
</style>
