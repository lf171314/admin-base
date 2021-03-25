class LocalStorage {
  get(name) {
    const value = window.localStorage.getItem(name)
    let result = ''
    try {
      result = JSON.parse(value)
    } catch (e) {
      result = value
    }
    return result
  }

  set(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
  }

  remove(name) {
    window.localStorage.removeItem(name)
  }

  clear() {
    window.localStorage.clear()
  }
}

export const Storage = new LocalStorage()
