<template>
    <div>
        <div class="p-3 border-bottom border-gray">
            <h3><strong class="d-block text-gray-dark">{{detail.title}}</strong></h3>
            <div class="text-muted d-flex">
                <small class="mr-auto">Date Posted : {{date}} </small>
                <span class="ml-3" v-if="profile.username === detail.ownedBy" @click="toEdit" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/2089/2089209.svg" alt="" width="20"></span>
                <span class="ml-3" v-if="profile.username === detail.ownedBy" @click="deleteQuest(detail._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/64/64022.svg" alt="" width="20"></span>
            </div>
        </div>
        <div class="row text-muted pt-3 border-bottom border-gray">
          <div class="col-1 d-flex flex-column text-center">
            <span @click="upvote(detail._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/25/25678.svg" alt="" width="20"> </span>
            <p class="m-0">{{totalVote}}</p>
            <span @click="downvote(detail._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/25/25224.svg" alt="" width="20"></span>

          </div>
          <div class="col-11">
              <p v-html="detail.description" class="pb-3 mb-0 small lh-125">
              </p>
            <div>
                <div class="p-3 mb-0 small lh-125 d-flex justify-content-end">
                   <button class="mx-3 btn btn-sm btn-dark" v-for="(tag, index) in detail.tags" :key="index">
                       {{tag}}
                   </button>
                </div>
                <p class="p-3 mb-0 small lh-125 d-flex justify-content-end">
                    Asked by : {{detail.ownedBy}}
                </p>
            </div>
          </div>
        </div>
        <!-- list answers -->
        <div v-if="detail.answers.length>0" class="p-3 border-bottom border-gray">
            <h6 class="d-block text-gray-dark">Answers</h6>
        </div>
        <div v-else class="p-3 border-bottom border-gray">
            <h6 class="d-block text-gray-dark">No one answered yet</h6>
        </div>
        <Answers
        v-for="answer in detail.answers" :key="answer._id"
        :answer="answer"
        @scrollToPostAnswer="scrollToPostAnswer"
        @changeToEdit="changeToEdit"
        />

        <!-- make answers -->
        <div class="answerPost p-3 border-bottom border-gray">
            <h6 v-if="!this.isEdit" class="d-block text-gray-dark">Your Answer</h6>
            <div v-else class="d-flex">
              <h6 class="d-block text-gray-dark font-weight-bold mr-auto">Edit Answer</h6>
              <small @click="changeBack" style="cursor:pointer" class="d-block btn-link font-weight-bold">Change Back</small>
            </div>

        </div>
        <div class="p-3">
            <form>
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              <button @click.prevent="postAnswer" v-if="!this.isEdit" class="btn btn-info mt-3" type="submit">Post Answer</button>
              <button v-else @click.prevent="editAnswer" class="btn btn-warning mt-3" type="submit">Edit Answer</button>
            </form>
        </div>

    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Answers from '@/components/Answers'
export default {
  components: {
    Answers
  },
  data () {
    return {
      currentAnswerId: '',
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      isEdit: false
    }
  },
  methods: {
    postAnswer () {
      if (this.isLogin) {
        let payload = {
          id: this.$route.params.id,
          description: this.editorData
        }
        this.editorData = ''
        this.$store.dispatch('postAnswer', payload)
      } else {
        this.$router.push('/login')
      }
    },
    editAnswer () {
      let payload = {
        questionId: this.$route.params.id,
        answerId: this.currentAnswerId,
        description: this.editorData
      }
      this.editorData = ''
      this.$store.dispatch('editAnswer', payload)
      this.changeBack()
    },
    upvote (id) {
      this.$store.dispatch('upvoteQuest', id)
    },
    downvote (id) {
      this.$store.dispatch('downvoteQuest', id)
    },
    toEdit () {
      this.$router.push('/editQuestion/' + this.$route.params.id)
    },
    deleteQuest (id) {
      this.$store.dispatch('deleteQuest', id)
    },
    scrollToPostAnswer () {
      const el = this.$el.getElementsByClassName('answerPost')[0]

      if (el) {
        el.scrollIntoView()
      }
    },
    changeToEdit (payload) {
      this.isEdit = true
      this.currentAnswerId = payload.id
      this.editorData = payload.description
    },
    changeBack () {
      this.isEdit = false
      this.editorData = ''
    }
  },
  computed: {
    detail () {
      return this.$store.state.detailQuestion
    },
    date () {
      Date.prototype.toISODate = function () {
        return this.getFullYear() + '-' +
                   ('0' + (this.getMonth() + 1)).slice(-2) + '-' +
                   ('0' + this.getDate()).slice(-2)
      }
      return new Date(this.detail.date).toISODate()
    },
    totalVote () {
      return this.detail.upvotes.length - this.detail.downvotes.length
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    profile () {
      return this.$store.state.profile
    }
  },
  created () {
    this.$store.dispatch('detailQuestion', this.$route.params.id)
  }
}
</script>

<style>
    .ck-content{
        min-height: 200px
    }
</style>
