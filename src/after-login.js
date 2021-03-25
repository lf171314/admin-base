import store from './store'

export default function afterLoginSuccess() {
  return new Promise((resolve, reject) => {
    store
      .dispatch('userLogin')
      .then(() => {
        resolve('login sucess~')
      })
      .catch(() => {
        reject(new Error('login failed~'))
      })
  })
}
