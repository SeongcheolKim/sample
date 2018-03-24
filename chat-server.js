//-------------------------------------------------------
//실시간 채팅 서버
//-------------------------------------------------------

// HTTP 서버 생성(전송 전용)

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
  console.log('서버 실행 완료:', 'http://localhost:' + portNo)

})

//public 디렉터리 공개
app.use('/dist', express.static('./dist'))
app.get('/', (req, res) => { //루트에 접근하면 /public로 리다이렉트
res.redirect(302, '/dist')
})

//웹 소켓 서버를 실행합니다.
  const socketio = require('socket.io')
  const io = socketio.listen(server)

  // 클라이언트가 접속했을 때 이벤트 설정
  io.on('connection', (socket) => {
    console.log('사용자 접속:', socket.client.id)
  // 메세지를 받으면
  socket.on('chat-msg', (msg) => {
    console.log('message:', msg)
  //모든 클라이언트에 전송
    io.emit('chat-msg', msg)
    })
  })
