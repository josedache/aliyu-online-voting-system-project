import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:8080/'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    profilePicture: "",
    userRoles: { VOTER: "VOTER", ADMIN: "ADMIN", CANDIDATE: "CANDIDATE" },
    candidatePosts: ['PRESIDENTIAL', 'GOVERNMENTAL', 'MEMBER', 'CHAIRMAN'],
    parties: [],
    candidates: [],
    generatedId: '',
    votes: [],
    governmentalWinner: {
      count: 0,
      candidate: {}
    },
    presidentialWinner: {
      count: 0,
      candidate: {}
    }
  },
  getters: {
    candidatesWithPost: ({ candidates }) => (votingPost) => candidates.filter(({ post }) => post === votingPost),
    getNamesOfParties: ({ parties }) => parties.map(party => party.abbreviation),
    getCandidatesInAParty: ({ candidates }) => (party) => candidates.filter((candidate) => candidate.party.id == party.id),
    checkIfUserCanVote: ({ votes, user }) => (post) => votes.every(({ candidate, voter }) => !(user.id == voter.id && candidate.post == post)),
    getResults: (state) => (candidate) => state.votes.filter(vote => vote.candidate.id == candidate.id && vote.candidate.post == candidate.post).length,
    getWinner: (state) => (post) => {
      if (post == 'PRESIDENTIAL') return state.presidentialWinner
      else if (post == 'GOVERNMENTAL') return state.governmentalWinner
    }

  },
  mutations: {
    updateStoreUser(state, payload) {
      state.user = payload
    },
    updateCandidates(state, candidates) {
      state.candidates = candidates
    },
    updateGeneratedId(state, generatedId) {
      state.generatedId = generatedId
    },
    updateParties(state, parties) {
      state.parties = parties
    },
    updateVotes(state, votes) {
      state.votes = votes
    },
    updateWinner(state, { count, candidate }) {
      if (count && candidate.post == 'GOVERNMENTAL' && count > state.governmentalWinner.count) {
        state.governmentalWinner = { count, candidate }
      }
      else if (count && candidate.post == 'PRESIDENTIAL' && count > state.presidentialWinner.count) {
        state.presidentialWinner = { count, candidate }
      }
    }
  },
  actions: {
    generateUserId(context, role) {
      return http.get(`user/generate-id/${role}`)
    },
    getUser(context, id) {
      return http.get(`user/${id}`)
    },
    getAllUser(context) {
      return http.get('user')
    },
    createUser({ state, dispatch, commit }, user) {
      user.id = state.generatedId
      return http
        .post('user', user)
        .then(({ data, status }) => {
          if (status == 200) {
            if (data.role == state.userRoles.VOTER) {
              dispatch('loginUser', { username: user.id, password: user.password })
                .then(({ data, status }) => {
                  if (status == 200) {
                    commit('updateStoreUser', data);
                    router.push({ name: "party" });
                  }
                })
                .catch(err => console.log(err))
            }
            else if (state.user.role == state.userRoles.ADMIN) {
              router.push({ name: "create-party" });
            } else if (state.user.role == state.userRoles.CANDIDATE && state.user.post == 'CHAIRMAN') {
              router.push({ name: "party" });
            }
          }
        })
        .catch(err => console.log(err))
    },
    loginUser({ commit }, { username, password }) {
      return http.post(`user/login/${username}`, null, {
        params: { password }
      })
    },
    logoutUser({ commit, state }) {
      return http.post(`user/logout/${state.user.id}`, null, {
        params: {
          password: state.user.password
        }
      })
    },
    userPasswordReset(context, { id, password, newPassword }) {
      return http({
        url: `user/password-reset/${id}`,
        method: 'post',
        params: { newPassword, password }
      })
    },
    deleteUser({ commit }, id) {
      return http.delete(`user/${id}`)
    },
    getCandidates({ commit }) {
      return http.get('user/candidates')
    },
    submitVote({ commit }, vote) {
      return http.post('vote', vote)
    },
    getAllVotes({ commit }) {
      return http.get('vote')

    },
    getVoteResult(commit, post) {
      http.get(`${post}`)
        .then(({ data, status }) => {

        })
    },
    createParty(context, party) {
      http.post('party', party)
        .then(({ data, status }) => {
          if (status == 200) {
            router.push({ name: 'party' })
          }
        }).catch(err => { })
    },
    removeParty(context, id) {
      return http.delete(`party/${id}`)
    },
    getParties() {
      return http.get('party')
    },
    getAllPartyAndMember({ commit }) {
      return http
        .get('party')
        .then(({ data, status }) => {
          if (status == 200) {
            commit('updateParties', data)
          }
        })
        .catch(err => console.log(err))
    },
    genereatePartyId() {
      return http.get('party/generete-id')
    },
    changeProfilePicture(context, { file, id }) {
      const formData = new FormData()
      formData.append('file', file)
      return http.post(`user/change-picture/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data, status }) => {
          // if (status == 200) {

          // }
        }).catch(err => console.log(err))
    }

  }
})
