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
    console.log(posts)
    if (!posts.length) {
        count = 0
    } else {
        count = posts[posts.length - 1].count + 1
    }
    await Posts.create({
        id,
        title,
        pw,
        comment,
        date,
        count // 각 게시글에 고유값 지정 위해서...
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


// 수정 페이지 이동
router.get('/:count/edit', async (req, res) => {
    const Count = req.params.count
    const post = await Posts.find({ count: Number(Count) }, { _id: false })
    res.render('../views/edit', { post })
})

router.put('/:count/edit', async (req, res) => {
    const Count = req.params.count
    // 비밀번호, 수정 내용 가져오기
    const { pw, comment } = req.body
    const existpost = await Posts.find({ count: Number(Count) }, { _id: false })
    // 게시글이 존재하고, 비밀번호가 동일하면 삭제
    if (existpost.length) {
        if (Number(pw) === Number(existpost[0].pw)) {
            await Posts.updateOne({ count: Number(Count) }, { $set: { comment } })
            res.json({ success: true, msg: '수정 완료했습니다.' })
        }
        else {
            res.json({ success: false, errormsg: '비밀번호가 틀립니다.' })
        }
    }
})

//  상세 게시글 삭제
router.delete('/:count/edit', async (req, res) => {
    const Count = req.params.count
    // 비밀번호, 수정 내용 가져오기
    const { pw } = req.body
    const existpost = await Posts.find({ count: Number(Count) }, { _id: false })

    // 게시글이 존재하고, 비밀번호가 동일하면 삭제
    if (existpost.length) {
        if (Number(pw) === Number(existpost[0].pw)) {
            await Posts.deleteOne({ count: Number(Count) })
            res.json({ success: true, msg: '삭제했습니다.' })
        }
        else {
            res.json({ success: false, errormsg: '비밀번호가 틀립니다.' })
        }
    }
})

module.exports = router