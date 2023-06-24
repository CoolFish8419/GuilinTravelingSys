<script>
import comments from '../../api/comments.vue'

export default {
  components: {
    comments
  },
  data() {
    return {
      id: '',
      type: '',
      search: '',
      username: ''
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    if (window.sessionStorage.getItem('info')) {
      this.username = JSON.parse(sessionStorage.getItem('info')).username
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      console.log(this.type);
      console.log('/' + this.type + '/search');
      const arr = await this.$http({
        method: 'post',
        url: '/' + this.type + '/details',
        data: {
          id: this.id,
          name: ''
        }
      })
      console.log(arr);
      this.search = arr.data.data
    }
  }
}
</script>
<template>
  <div class="content">
    <div class="title"><span @click="this.$router.push('/home')" class="home">首页</span> > <span>详情</span></div>
    <div class="details_content" v-for="item in search" :key="id">
      <div class="info">
        <div class="left" v-if="type == 'attractions' || type == 'hotel' || type == 'restaurant' || type == 'food'">
          <a-image height="300px" :src="item.image" style="margin:10px;" :title="item.area" fit="fill" />
        </div>

        <div class="right" v-if="type == 'attractions'">
          <div class="right_wenzi">地点：{{ item.title == undefined ? '暂无数据' : item.title }}</div>
          <div class="right_wenzi">热度：{{ item.hot == undefined ? '暂无数据' : item.hot }}</div>
          <div class="right_wenzi">区域：{{ item.address == undefined ? '暂无数据' : item.address }}</div>
        
          <div class="right_wenzi">评分：{{ item.score == undefined ? '暂无数据' : item.score }}</div>
        </div>
        <div class="right" v-else-if="type == 'hotel'">
            <div class="right_wenzi">名称：{{ item.name == undefined ? '暂无数据' : item.name }}</div>
          <div class="right_wenzi">地址：{{ item.address == undefined ? '暂无数据' : item.address }}</div>
          <div class="right_wenzi">价格：{{ item.price== undefined ? '暂无数据' : item.price }}元</div>
          <div class="right_wenzi">评分：{{ item.score == undefined ? '暂无数据' : item.score }}</div>
        </div>
        <div class="right" v-else-if="type == 'restaurant'">
          <div class="right_wenzi">店名：{{ item.name == undefined ? '暂无数据' : item.name }}</div>
          <div class="right_wenzi">地址：{{ item.address == undefined ? '暂无数据' : item.address }}</div>
          <div class="right_wenzi">价格：{{ item.price == undefined ? '暂无数据' : item.price }}</div>
          <div class="right_wenzi">评分：{{ item.score == undefined ? '暂无数据' : item.score }}</div>

        </div>
        <div class="right" v-else-if="type == 'food'">
          <div class="right_wenzi">菜名：{{ item.name == undefined ? '暂无数据' : item.name }}</div>
          <div class="right_wenzi">推荐数：{{ item.recommend == undefined ? '暂无数据' : item.recommend}}</div>
          <div class="right_info">详细信息:{{ item.information == undefined ? '暂无数据' : item.information }}</div>
        </div>
        <div class="right" v-else-if="type == 'notes'">
          <div class="right_wenzi">题目：{{ item.title == undefined ? '暂无数据' : item.title }}</div>
          <div class="right_wenzi">行程：{{ item.address == undefined ? '暂无数据' : item.address }}</div>
          <div class="right_wenzi">出游日期：{{ item.time == undefined ? '暂无数据' : item.time }}</div>
          <div class="right_wenzi">记录：{{ item.quantity == undefined ? '暂无数据' : item.quantity }}</div>
          <div class="right_info">正文：{{ item.content == undefined ? '暂无数据' : item.content }}</div>

          <div class="right_wenzi">精选照片</div>
          <a-image height="160px" :src="item.image" style="margin:10px;" :title="item.area" fit="fill" />
        </div>
      </div>
      <div class="comments">
        <a>评论：</a>
        <comments :username="this.username" :type="this.type" :id="this.id" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.content {
  width: 80%;
  margin: 0 auto 40px;
  position: relative;

  .title {
    font-size: 16px;
    height: 26px;
    line-height: 26px;
    border-bottom: 1px solid black;
    cursor: default;

    .home {
      cursor: pointer;
    }

    .home:hover {
      color: seagreen;
    }
  }

  .details_content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgba(247, 247, 247, 1);

    .info {
      display: flex;
      flex-direction: row;
    }

    .comments {
      margin-top: 30px;
      font-size: 20px;
    }

    .left_notes {
      display: grid;
      grid-template-columns: 200px 200px;
      grid-template-rows: 200px 200px;
      grid-gap: 20px;
    }

    .right {
      margin: 20px;

      .right_wenzi {
        height: 30px;
        width: 550px;
        font-size: 18px;
        line-height: 30px;
        white-space: nowrap;
        overflow:visible;
        text-overflow:ellipsis;
      }
      .right_info{
        height: auto;
        width: auto;
        font-size: 18px;
        line-height: 30px;
        white-space:normal;
        overflow:visible;
      }
    }
  }
}
</style>