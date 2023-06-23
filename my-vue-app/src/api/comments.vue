<template>
    <div>
        <ul>
            <ul style="margin:10px 5px" v-for="comment in comments" :key="comment.id">
                <strong>{{ comment.username }}</strong>: {{ comment.content }}
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

        username: {
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
    },
    methods: {
        submitComment() {
            if (this.commentText && this.username) {
                const newComment = {
                    type: this.type,
                    pid: this.id,
                    username: this.username,
                    content: this.commentText
                };

                this.$http.post('/comments/add', newComment)
                    .then(response => {
                        this.commentText = '';
                        this.fetchComments();
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
                    if (response.data)
                        this.comments = response.data.reduce(function (obj, item) {
                            obj[item.id] = item;
                            return obj;
                        }, {});
                    console.log(this.comments)
                })
                .catch(error => {
                    console.error('获取评论内容失败:', error);
                });
        }
    }
};
</script>
  