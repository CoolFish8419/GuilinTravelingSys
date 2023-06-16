<template>
    <div>
        <ul>
            <ul style="margin:10px 5px" v-for="comment in comments" :key="comment.id">
                <strong >{{ comment.entityId }}</strong>: {{ comment.content }}
            </ul>
        </ul>

        <form @submit.prevent="submitComment">
            <el-input
                style="margin-top: 20px" 
                v-model="entityId" 
                maxlength="10" 
                placeholder="Please input your name" 
                show-word-limit type="text" 
                required
            />
            
            <div style="margin: 20px 0" />

            <el-input v-model="commentText" 
             maxlength="30" 
             placeholder="Please input your comment" 
             show-word-limit 
             type="textarea" 
            required/>

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
            comments: [
                {
                    entityId:"123",
                    content:'asdasd'
                },
                {
                    entityId:"123",
                    content:'asdasd'
                },
            ],
            entityId: '',
            commentText: ''
        };
    },
    created() {
        // this.fetchComments
    },
    methods: {
        submitComment() {
            if (this.entityId && this.commentText) {
                const newComment = {
                    id: this.id,
                    type: this.type,
                    entityId: this.entityId,
                    content: this.commentText
                };

                axios
                    .post(apiUrl, newComment)
                    .then(response => {
                        this.comments.push(newComment);
                        this.entityId = '';
                        this.commentText = '';
                    })
                    .catch(error => {
                        console.error('评论提交失败:', error);
                    });

            }
        },
        fetchComments() {
            id = this.id;
            type = this.type;
            // 发起 GET 请求到后端接口
            axios.get(`/api/comments/${id}/${type}`)
                .then(response => {
                    this.comments = response.data;
                })
                .catch(error => {
                    console.error('获取评论内容失败:', error);
                });
        }
    }
};
</script>
  