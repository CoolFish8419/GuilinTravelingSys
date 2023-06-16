<script>
export default {
   data() {
      return {
         comName: 'home',
         info: '',
         timer: ''
      }
   },
   components: {

   },
   created() {
      if (window.sessionStorage.getItem('comName')) {
         this.comName = window.sessionStorage.getItem('comName')
      }
   },
   mounted() {
      if (window.sessionStorage.getItem('info')) {
         this.info = JSON.parse(window.sessionStorage.getItem('info'))
      }
   },
   methods: {
      getComName(val) {
         this.comName = val
      },
      login() {
         if (this.info == '') {
            this.$router.push('/manage')
         } else {
            if (this.info.type == 0) {
               if (!this.timer) {
                  console.log(1);
                  ElMessage({
                     message: '你没有此权限',
                     type: 'error',
                     grouping: true,
                     duration: 3000
                  })
                  this.timer = setTimeout(() => {
                     this.timer = null
                  }, 3000)
               }
            } else {
               this.$router.push('/manage')
            }
         }
      }
   },
   computed: {

   }
}
</script>
<template>
   <div class="body">
      <header>
         <div class="title">
            <div class="left_title">
               Guilin | 桂林旅游信息网
            </div>
            <div class="right_title">
               <div class="login" v-if="info == ''">
                  <span @click="this.$router.push('/login')">登录</span>
               </div>
               <div class="avatar">
                  <el-avatar :size="56" :src="info.avatar" @click="$router.push('/setting')"/>
               </div>
               <div @click="login" class="ht" v-if="this.info.type == 1">
                  <span class="icon_ma" >后台管理</span>
               </div>
            </div>
         </div>
         <nav>
            <ul>
               <li @click="this.$router.push('/home')">首页</li>
               <li @click="this.$router.push('/attractions')">景点</li>
               <li @click="this.$router.push('/hotel')">酒店</li>
               <li @click="this.$router.push('/restaurant')">餐厅</li>
               <li @click="this.$router.push('/food')">美食</li>
               <li @click="this.$router.push('/notes')">攻略</li>
            </ul>
         </nav>
      </header>
      <div id="contain">
         <router-view :is="comName" @comNameChange="getComName"></router-view>
      </div>
      <footer>
         <div>桂林旅游</div>
      </footer>
   </div>
</template>
<styel scoped lang="less">
.body {
   display: flex;
   flex-direction: column;
   min-height: 100vh;
}

header {
   height: 120px;

   .title {
      display: flex;
      justify-content: center;
      height: 100px;
      background-image: url('../assets/image/bg.jpg');

      .left_title {
         width: 40%;
         line-height: 80px;
         font-size: 42px;
         font-style: oblique;
         cursor: default;
         user-select: none;
         color: #11619d;
      }

      .right_title {
         position: relative;
         width: 50%;
         font-size: 18px;
         line-height: 32px;
         .login,
         div {
            span {
               z-index: 1;
               right:0;
               position: absolute;
               color: #3498db;
               cursor: pointer;
            }
         }

         .login {
            height: 70px;
            line-height: 70px;
         }

         .ht {
            cursor: pointer;
            width: 80px;

            img {
               display: block;
               margin: 15px auto 0;
            }

            .icon_ma {
               bottom: 0;
               right: -20px;
               display: block;
               height: 30px;
               line-height: 30px;
               width: 80px;
               text-align: center;
            }
         }

         .avatar {
            z-index: 0;
            top: 0%;
            right: -4%;
            margin-right: 20px;
            width: 80px;
            position: absolute;

            .el-avatar {
               display: block;
               margin: 12px auto;
            }


         }
      }
   }

   nav {
      height: 40px;
      background-image: linear-gradient(120deg, #2d98df, #8e44ad);

      ul {
         display: flex;
         width: 80%;
         margin: 0 auto;

         li {
            list-style-type: none;
            margin-right: 20px;
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            color: white;
            cursor: pointer;
         }

         li:hover {
            color: #8e44ad;
            transition: all .2s;
         }
      }
   }
}

#contain {
   margin-top: 20px;
   flex: 1;
}

footer {
   height: 100px;
   line-height: 100px;
   background-image: linear-gradient(120deg, #3498db, #8e44ad);
   text-align: center;
   font-size: 24px;
   color: white;
}</styel>