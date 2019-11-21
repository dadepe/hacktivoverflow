<template>
<div>
  <!-- <div v-if="!$store.state.loading">
    <h1>Loading</h1>
  </div> -->
  <div>
  <div>
      <h3 class="p-3">Edit Question</h3>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-8 px-5 pb-5">
      <form @submit.prevent="updateQuestion">
        <div class="form-group">
          <div class="d-flex flex-column mb-1">
              <label class="m-0" for="titleQuestion">Title</label>
              <small class="text-muted">Edit your question title to give additional information, be sure not change the topic!</small>
          </div>
          <input v-model="title" type="text" class="form-control" id="titleQuestion" placeholder="your question title">
        </div>
        <div class="form-group">
            <div class="d-flex flex-column mb-1">
                <label class="m-0">Body</label>
                <small class="text-muted">You can add or remove the information that might needed for this topic</small>
            </div>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div class="form-group">
          <div class="d-flex flex-column mb-1">
              <label class="m-0" for="tags">Tags</label>
              <small class="text-muted">Add again your tags if needed, use comma (,) to separate tags</small>
          </div>
          <input v-model="tags" type="text" class="form-control" id="tags" placeholder="question tags">
        </div>
        <button type="submit" class="btn btn-info">Edit Question</button>
      </form>
    </div>
    <div class="col-sm-12 col-md-4 pr-5">
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 text-muted">Tips for Editing</h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div style="font-size: 12px">
                <p class="pt-2 text-justify">
                    The community doesn't want you to change the topic of your question suddenly, they are here to help you with specific coding, algorithm,
                    or language problems that you posted before
                </p>
                <p class="pt-2 text-justify">
                    Edit necessarily, dont confuse the community with the edited question.
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

</div>

</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data () {
    return {
      // title: '',
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
    updateQuestion () {
      let payload = {
        id: this.$route.params.id,
        title: this.title,
        description: this.editorData,
        tags: this.tags
      }
      this.$store.dispatch('updateQuestion', payload)
      this.$router.go('-1')
    }
  },
  // computed: {
  //   detail () {
  //     return this.$store.state.detailQuestion
  //   }
  // },
  created () {
    this.$store.dispatch('detailQuestion', this.$route.params.id)
      .then(data => {
        this.title = data.title
        this.tags = data.tags.join(', ')
        this.editorData = data.description
      })
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
