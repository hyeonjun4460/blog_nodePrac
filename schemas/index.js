//  db 연결 스키마

//  mongoDB 컨트롤 위한 모듈 생성
const { default: mongoose } = require('mongoose')
const express = require('express')

// db 연결
const connect = () => {
    mongoose.connect('mongodb://localhost:27017/blog_nodePrac', { ignoreUndefined: true }).catch((err) => {
        console.error(err) // 서버 입장에선 localhost임
    })
}


// connect란 이름으로 모듈 추가.
module.exports = connect