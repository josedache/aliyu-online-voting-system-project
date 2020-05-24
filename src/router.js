import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  // base: '/app/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        const userId = store.state.user.id
        if (userId) {
          store
            .dispatch('logoutUser')
            .then(({ data, status }) => {
              store.commit('updateStoreUser', {})
              next()
            })
            .catch(error => { })
        }
        next()
      }
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('./components/UserForm.vue'),
      beforeEnter(to, from, next) {
        generateUserId(to, from, next)
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: () => import('./views/Admin.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'change-password',
              name: 'change-password',
              component: () => import('./components/ChangePassword.vue')
            },
            {
              path: 'create-user',
              name: 'create-user',
              component: () => import('./components/UserForm.vue'),
              meta: { requiresAuth: true },
              beforeEnter(to, from, next) {
                generateUserId(to, from, next)
              }
            },
            {
              path: 'remove-user',
              name: 'remove-user',
              component: () => import('./components/RemoveUserForm.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'remove-party',
              name: 'remove-party',
              component: () => import('./components/RemoveUserForm.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'create-party',
              name: 'create-party',
              component: () => import('./components/PartyForm.vue'),
              meta: { requiresAuth: true },
            }

          ]
        },
        {
          path: 'party',
          name: 'party',
          component: () => import('./views/Party.vue'),
          meta: { requiresAuth: true },
          beforeEnter(to, from, next) {
            store.dispatch('getCandidates')
              .then(({ data, status }) => {
                if (status == 200) {
                  store.commit('updateCandidates', data)
                  getParties(to, from, next)
                } else {
                  next(false)
                }
              })
              .catch(err => { console.log(error) })
          }

        },
        {
          path: 'vote',
          name: 'vote',
          component: () => import('./views/Vote.vue'),
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            getVotesAndCandidate(to, from, next)
          }
        },
        {
          path: 'results',
          name: 'results',
          component: () => import('./views/Results.vue'),
          meta: { requiresAuth: true },
          beforeEnter(to, from, next) {
            getVotesAndCandidate(to, from, next)
          }
        },
      ]

    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export function generateUserId(to, from, next) {
  store.dispatch('generateUserId', to.query.role)
    .then(({ data, status }) => {
      if (status == 200) {
        store.commit('updateGeneratedId', data)
        if (to.query.role == 'CANDIDATE') {
          getParties(to, from, next)
        } else next()
      }
    })
    .catch(err => { })
}

function getParties(to, from, next) {
  store.dispatch('getParties')
    .then(({ data, status }) => {
      if (status == 200) {
        store.commit('updateParties', data)
        next()
      }
      next(false)
    }).catch(err => { })
}

function getVotesAndCandidate(to, from, next) {
  store.dispatch('getCandidates')
    .then(({ data }) => {
      store.commit('updateCandidates', data)
      store.dispatch('getAllVotes')
        .then(({ data, status }) => {
          if (status == 200) {
            store.commit('updateVotes', data)
            next()
          }
        }).catch(err => { })
    })
    .catch(err => { console.log(error) })
}

export default router;
