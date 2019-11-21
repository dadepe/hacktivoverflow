<template>
<div>
  <div>
      <h3 class="p-3">Ask a Public Question</h3>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-8 px-5 pb-5">
      <form @submit.prevent="askQuestion">
        <div class="form-group">
          <div class="d-flex flex-column mb-1">
              <label class="m-0" for="titleQuestion">Title</label>
              <small class="text-muted">Be specific and imagine you’re asking a question to another person</small>
          </div>
          <input v-model="title" type="text" class="form-control" id="titleQuestion" placeholder="your question title">
        </div>
        <div class="form-group">
            <div class="d-flex flex-column mb-1">
                <label class="m-0">Body</label>
                <small class="text-muted">Include all the information someone would need to answer your question</small>
            </div>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div class="form-group">
          <div class="d-flex flex-column mb-1">
              <label class="m-0" for="tags">Tags</label>
              <small class="text-muted">Add tags to describe what your question is about, use comma (,) to separate tags</small>
          </div>
          <input v-model="tags" type="text" class="form-control" id="tags" placeholder="question tags">
        </div>
        <button type="submit" class="btn btn-info">Submit Question</button>
      </form>
    </div>
    <div class="col-sm-12 col-md-4 pr-5">
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 text-muted">Tips for Asking</h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div style="font-size: 12px">
                <p class="pt-2 text-justify">
                    The community is here to help you with specific coding, algorithm,
                    or language problems.
                </p>
                <p class="pt-2 text-justify">
                    Avoid asking opinion-based questions.
                </p>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 font-weight-bold">Summarize The Problem</h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 font-weight-bold">Describe what you've tried</h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 font-weight-bold">Show some code</h6>
          </div>
        </li>
      </ul>
    </div>
  </div>

</div>

</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data () {
    return {
      title: '',
      tags: '',
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  methods: {
    askQuestion () {
      let payload = {
        title: this.title,
        description: this.editorData,
        tags: this.tags
      }
      this.$store.dispatch('postQuestion', payload)
      this.title = ''
      this.description = ''
      this.tags = ''
      this.$router.go('-1')
    }
  }
}
</script>

<style scoped>

</style>
