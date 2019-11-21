import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../myAxios/axios'
import router from '../router'
import Swal from 'sweetalert2'
import cron from 'node-cron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    profile: {
      QuestionsId: []
    },
    listQuestions: [],
    listQuestionsNow: [],
    detailQuestion: '',
    page: 1,
    maxPage: 1,
    changePage: 0,
    notSearch: true,
    typeSearch: '',
    loading: false,
    tagNow: '',
    searchNow: '',
    randomTag : []
  },
  mutations: {
    STATUS_LOGIN (state, status) {
      state.isLogin = status
    },
    DATA_QUESTIONS (state, data) {
      state.listQuestions = []
      data.forEach(element => {
        state.listQuestions.unshift(element)
      })
    },
    DETAIL_QUESTION (state, data) {
      state.detailQuestion = data
    },
    REFRESH_LIST (state) {
      state.listQuestionsNow = []
    },
    PAGE_STATUS (state, page) {
      state.page = page
    },
    PAGE_DATA (state, data) {
      state.listQuestionsNow = data
    },
    NEXT_PAGE (state) {
      state.page += 1
    },
    BACK_PAGE (state) {
      state.page -= 1
    },
    MAX_PAGE (state, page) {
      state.maxPage = Math.floor(((page) / 5) - 0.1) + 1
    },
    CHANGE_BACK (state) {
      state.changePage -= 1
    },
    CHANGE_NEXT (state) {
      state.changePage += 1
    },
    CHANGE_NOW (state, index) {
      state.changePage = index
    },
    SET_PROFILE (state, data) {
      state.profile = data
    },
    CHANGE_LOADING (state, payload) {
      state.loading = payload
    },
    STATUS_SEARCH (state, status) {
      state.notSearch = status
    },
    TAG_NOW (state, tag) {
      state.tagNow = tag
    },
    TYPE_SEARCH (state, type) {
      state.typeSearch = type
    },
    SEARCH_NOW (state, search) {
      state.searchNow = search
    },
    ADD_RANDOM (state, tag){
      state.randomTag.push(tag)
    },
    RESET_RANDOM (state){
      state.randomTag = []
    }
  },
  actions: {
    register (context, payload) {
      axios.post('/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'success register, nice to meet you ' + data.username
          })
          router.push('/login')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    },
    login (context, payload) {
      axios.post('/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'success login, enjoy your visit ' + data.payload.username
          })
          localStorage.setItem('token', data.token)
          context.commit('STATUS_LOGIN', true)
          context.dispatch('getProfile')
          context.dispatch('autoTag')
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    getProfile (context) {
      axios.get('/users/profile', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PROFILE', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchQuestions (context) {
      axios.get('/questions')
        .then(({ data }) => {
          context.commit('DATA_QUESTIONS', data)
          context.commit('MAX_PAGE', data.length)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchPagination (context, page) {
      context.commit('REFRESH_LIST')
      context.commit('PAGE_STATUS', page)
      axios.get(`/questions/page/${page}`)
        .then(({ data }) => {
          context.commit('PAGE_DATA', data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    fetchNext (context, addPage) {
      context.commit('REFRESH_LIST')
      context.commit('NEXT_PAGE')
      axios.get(`/questions/page/${addPage}`)
        .then(({ data }) => {
          context.commit('PAGE_DATA', data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    fetchBack (context, backPage) {
      context.commit('REFRESH_LIST')
      context.commit('BACK_PAGE')
      axios.get(`/questions/page/${backPage}`)
        .then(({ data }) => {
          context.commit('PAGE_DATA', data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    searchQuestions (context, search) {
      axios.get('questions/search?filter=' + search)
        .then(({ data }) => {
          context.commit('TYPE_SEARCH', 'search')
          context.commit('SEARCH_NOW', search)
          context.commit('STATUS_SEARCH', false)
          context.commit('PAGE_DATA', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    detailQuestion (context, id) {
      return new Promise(function (resolve, reject) {
        axios.get('/questions/' + id)
          .then(({ data }) => {
            resolve(data)
            context.commit('DETAIL_QUESTION', data)
            context.commit('CHANGE_LOADING', true)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    postAnswer (context, payload) {
      axios.post('/answers/' + payload.id, {
        description: payload.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
          context.dispatch('detailQuestion', payload.id)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    },
    editAnswer (context, payload) {
      axios.patch('/answers/' + payload.answerId, {
        description: payload.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
          context.dispatch('detailQuestion', payload.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    },
    postQuestion (context, payload) {
      axios.post('questions', {
        title: payload.title,
        description: payload.description,
        tags: payload.tags
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success post your question'
          })
          context.dispatch('fetchQuestions')
          context.dispatch('fetchPagination', 1)
          context.dispatch('getProfile')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    },
    updateQuestion (context, payload) {
      axios.patch('questions/' + payload.id, {
        title: payload.title,
        description: payload.description,
        tags: payload.tags
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success edit your question'
          })
          context.dispatch('fetchQuestions')
          context.dispatch('getProfile')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    },
    upvoteQuest (context, id) {
      axios.patch('/questions/upvote/' + id, {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.dispatch('fetchQuestions')
          context.dispatch('detailQuestion', id)
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    downvoteQuest (context, id) {
      axios.patch('/questions/downvote/' + id, {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.dispatch('fetchQuestions')
          context.dispatch('detailQuestion', id)
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    upvoteAnswer (context, payload) {
      axios.patch('/answers/upvote/' + payload.answerId, {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.dispatch('detailQuestion', payload.questionId)
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    downvoteAnswer (context, payload) {
      axios.patch('/answers/downvote/' + payload.answerId, {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.dispatch('detailQuestion', payload.questionId)
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    addWatch (context, tag) {
      axios.patch('/users/addWatchTags', {
        tag
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
          context.dispatch('getProfile')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteWatch (context, tag) {
      axios.patch('/users/removeWatchTags', {
        tag
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.msg
          })
          context.dispatch('getProfile')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    searchWatch (context, tag) {
      axios.get('/questions/tagged/' + tag, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('TYPE_SEARCH', 'tag')
          context.commit('STATUS_SEARCH', false)
          context.commit('PAGE_DATA', data)
          context.commit('TAG_NOW', tag)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteQuest (context, id) {
      Swal.fire({
        title: 'Are you sure want to delete this question?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.value) {
          axios.delete('/questions/' + id, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire({
                icon: 'success',
                title: data.msg
              })
              context.dispatch('fetchQuestions')
              context.dispatch('getProfile')
              router.go(-1)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    deleteAnswer (context, payload) {
      Swal.fire({
        title: 'Are you sure want to delete this answer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.value) {
          axios.delete('/answers/' + payload.answerId, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              console.log(data)
              Swal.fire({
                icon: 'success',
                title: data.msg
              })
              context.dispatch('detailQuestion', payload.questionId)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // autoLogOut(context){
    //   console.log('started in 10')
    //   cron.schedule('*/10 * * * * *', () => {
    //       localStorage.removeItem('token')
    //       context.commit('STATUS_LOGIN', false)
    //       context.commit('SET_PROFILE', '')
    //       router.push('/')
    //       console.log('started done')
    //   });
    // },
    autoTag(context){
      console.log('started in 30')
      cron.schedule('*/30 * * * * *', () => {
        axios.get('/questions/randomTag')
        .then(({data})=>{
          console.log(data)
          context.commit('ADD_RANDOM', data.random)
        })
        .catch(err=>{
          console.log(err)
        })
      });
    }
  },
  modules: {
  }
})
