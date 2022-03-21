// EXPRESS
const express = require('express')
const app = express()
const Posts = require('../schemas/post')

// 라우터 
const router = express.Router()

// 전체 게시글 조회 API
router.get('/', async (req, res) => {
    const post = await (await Posts.find({}, { _id: false, pw: false, comment: false })).sort((a, b) => {
        if (a.date > b.date) {
            return -1
        }
    }) // 작성날짜 기준 내림차순 정렬해서 return


    res.render('../views/index', {
        post
    })
})

router.get('/upload', (req, res) => {
    res.render('../views/post')
})

// 게시글 POST API
router.post('/upload', async (req, res) => {
    const { id, title, pw, comment } = req.body
    const date = new Date()
    let count = 0
    posts = await Posts.find({})
    count = posts.length

    console.log(posts.length)
    await Posts.create({
        id,
        title,
        pw,
        comment,
        date,
        count
    })
    res.json({ success: true, post: posts })
})

// 상세 게시글 조회 API
router.get('/:count', async (req, res) => {
    const Count = req.params.count
    const post = await Posts.find({ count: Number(Count) }, { _id: false, pw: false })
    // res.json({ success: true, post: post })
    res.render('../views/detail', { post })
})

module.exports = router