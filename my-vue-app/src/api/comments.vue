<template>
    <div>
        <ul>
            <ul style="margin:10px 5px" v-for="comment in comments" :key="comment.id">
                <strong>{{ this.uid }}</strong>: {{ comment.content }}
            </ul>
        </ul>

        <form @submit.prevent="submitComment">

            <el-input v-model="commentText" maxlength="30" placeholder="Please input your comment" show-word-limit
                type="textarea" required />

            <button type="submit" style="margin: 20px 0">提交评论</button>
        </form>
    </div>
</template>
  
<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },

        uid: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            comments: [],
            commentText: ''
        };
    },
    mounted() {
        this.fetchComments();
        console.log(this.uid)
    },
    methods: {
        submitComment() {
            if (this.commentText && this.uid) {
                const newComment = {
                    type: this.type,
                    pid: this.id,
                    uid: this.uid,
                    content: this.commentText
                };

                this.$http.post('/comments/add', newComment)
                    .then(response => {
                        this.comments.push(newComment);
                        this.commentText = '';
                        console.log(newComment)
                    })
                    .catch(error => {
                        console.error('评论提交失败:', error);
                    });


            }
            else {
                alert('评论前请登录');
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000)
            }
        },
        fetchComments() {
            let pid = this.id;
            let type = this.type;
            // 发起 GET 请求到后端接口
            this.$http.get(`/comments/${pid}/${type}`)
                .then(response => {
                    if (response.config.data) this.comments = response.config.data;
                    console.log(response)
                })
                .catch(error => {
                    console.error('获取评论内容失败:', error);
                });
        }
    }
};
</script>
  