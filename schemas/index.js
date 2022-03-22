//  db 연결 스키마

//  mongoDB 컨트롤 위한 모듈 생성
const { default: mongoose } = require('mongoose')
const express = require('express')

// db 연결
const connect = () => {
    mongoose.connect('mongodb://13.125.247.222:27017', { ignoreUndefined: true }).catch((err) => {
        console.error(err)
    })
}

module.exports = connect