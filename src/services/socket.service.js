import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
// export const socketService = createSocketService()
export const socketService = createDummySocketService()

window.socketService = socketService


function createSocketService() {
  var socket
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb) {
      socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]

    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })

    },
    debugMsg() {
      this.emit('chat newMsg', {from: 'Someone', txt: 'Aha it worked!'})
    },
  }
  return socketService
}

  socketService.on()

// Basic Tests
function cb(x=2) {console.log(x)}
socketService.on('chat addMsg', cb)
socketService.emit('chat addMsg', 'DATA')
socketService.off('chat addMsg', cb)
