<script>
 
 export default{
   data() {
    return {
     search_contain:'',
     option:'attractions',
     images:[
       'http://10.38.181.12:3020/1.jpeg',
       'http://10.38.181.12:3020/2.jpeg',
       'http://10.38.181.12:3020/3.jpeg',
       'http://10.38.181.12:3020/4.jpeg',
       'http://10.38.181.12:3020/5.jpeg',
      ],
     page:2
    }
   },
   components:{
     
   },
   created() {

   },
   mounted() {

   },
   methods:{
    async SearchContent() {
      let arr = ''
      this.$router.push({
       path:'/search',
       query:{
        search_contain:this.search_contain,
        option:this.option
       }
      })
      // this.page += 2
      // this.$emit('searchData',this.d)
    },
   }
 }
 </script>
<template>
 <div class="content1">
  <div class="head_content">
    <div class="left_content">
      <div class="title">
        桂林市，简称“桂”，古称桂州、静江、始安，广西壮族自治区辖地级市，省域副中心城市，地处中国华南，湘桂走廊南端，位于南岭山系西南部、桂林—阳朔岩溶盆地北端中部，处在“湘桂夹道”中，“桂林”之名，始于秦代，秦始皇置桂林、象、南海三郡，桂林郡因当地盛产玉桂而成名，这是“桂林”名称的最早起源。
      </div>
      <el-radio-group v-model="option" fill="#3498db" >
        <el-radio-button label="attractions">景点</el-radio-button>
        <el-radio-button label="hotel">酒店</el-radio-button>
        <el-radio-button label="restaurant">餐厅</el-radio-button>
        <el-radio-button label="food">美食</el-radio-button>
        <el-radio-button label="notes">攻略</el-radio-button>
      </el-radio-group>
      <el-input type="text" v-model="search_contain"  placeholder="请输入想要搜索的内容" @keyup.enter.native="SearchContent" />
      <el-button icon="" color="#3498db" @click="SearchContent">
        开始搜索
      </el-button>
    </div>
    <div class="right_content">
      <a-carousel
      :style="{
        width: '80%',
        height: '300px'
      }"
      indicator-position="outer"
      :auto-play="true"
      show-arrow="never"
      indicator-type="dot"
      >
       <a-carousel-item v-for="image in images" :style="{width:'100%'}">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
       </a-carousel-item>
      </a-carousel>
    </div>
  </div>
 </div>
</template>
<style scoped lang="less">
 .content1 {
  width: 100%;
  margin: 0 auto 40px;
  position: relative;
  .head_content {
    display: flex;
    justify-content: space-around;
    border-radius: 5px;

    background-color: rgba(247,247,247,1);
    padding: 10px;
    .left_content {
      .title {
        display: block;
        font-size: 18px;
        text-indent: 2em;
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:7;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
      }
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-input {
        width: 100%;
        margin-bottom: 10px;
      }
      .el-button {
        display: block;
        width: 100%;
        color: white;
      }
      .el-radio-group {
        display: block;
        margin-bottom: 10px;
      }
    }
    .right_content {
      flex: 1;
      .arco-carousel {
        margin: 0 auto;
      }
    }
  }
 }
</style>