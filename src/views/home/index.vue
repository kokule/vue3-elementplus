<template>
  <div class="home">
    <Hamburger></Hamburger>
    <div class="home-top-nav">
      <el-tooltip content="退出登录" effect="dark" placement="bottom">
        <svg-icon class="svg-icon-exit hover-effect hover-animation" icon-class="exit" @click="logout"/>
      </el-tooltip>
      <div class="user">你好，刘德华</div>

      <div class="user-img">
        <img src="@/assets/images/liudehua.png"/>
      </div>

    </div>
    <div class="home-title animate__animated animate__backInDown">国内游戏发行</div>
    <div class="system-box">
      <div v-for="item in systemList"
           :key="item.title"
           @click="toSystem"
           :class="item.animateClass"
           class="system-box-item hover-animation animate__animated">
        <svg-icon :icon-class="item.svg"></svg-icon>
        <h5>{{ item.title }}</h5>
      </div>
    </div>
  </div>
</template>
<script setup>
// import Hamburger from '@/components/Hamburger/index.vue'
import {useRouter} from "vue-router";
import SvgIcon from "@/components/SvgIcon/index.vue";

const router = useRouter()
const systemList = [
  {
    svg: 'putin',
    title: '投放系统',
    animateClass: 'animate__bounceInLeft'
  },
  {
    svg: 'operate',
    title: '运营系统',
    animateClass: 'animate__bounceInDown'
  },
  {
    svg: 'count',
    title: '统计系统',
    animateClass: 'animate__bounceInDown'
  },
  {
    svg: 'auth',
    title: '权限系统',
    animateClass: 'animate__bounceInDown'
  },
  {
    svg: 'cp',
    title: 'CP系统',
    animateClass: 'animate__bounceInRight'
  }
]

const toSystem = () => {
  router.push({ path: '/platform/game-manage', query: {} });
}

const logout = () => {
  router.push({ path: '/login', query: {} });
}
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-image: url("../../assets/images/home_bg.jpg");

  .home-top-nav {
    display: flex;
    height: 50px;
    padding-right: 30px;
    flex-direction: row-reverse;
    .user {
      color: white;
      margin: 0 15px;
      padding-top: 15px;
    }
    .user-img {
      width: 30px;
      height: 30px;
      padding-top: 12px;
      img {
        width: 100%;
        border-radius: 50px;
      }
    }
    .svg-icon-exit {
      font-size: 26px;
      margin-top: 14px;
    }
  }

  .home-title {
    position: absolute;
    top: 18%;
    left: 36%;
    font-style: italic;
    text-shadow: -5px -5px 5px #646161;
    color: antiquewhite;
    font-size: 72px;
    letter-spacing: 20px;
    font-weight: bold;
  }


  .system-box {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    .svg-icon {
      font-size: 100px;
      z-index: 10;
    }
  }

  .system-box-item {
    position: relative;
    width: 240px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(10, 4, 4, 0.05);
    overflow: hidden;
    border-radius: 20px;
    margin-left: 40px;
    box-shadow: #1c84c6 5px 5px 10px;
  }

  .system-box-item:before {
    content: '';
    position: absolute;
    width: 100px;
    height: 130%;
    z-index: 1;
    background: linear-gradient(transparent, #00ccff, transparent);
    animation: animate 10s linear infinite
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .system-box-item:after {
    content: '';
    position: absolute;
    inset: 3px;
    background: black;
    border-radius: 20px;
    z-index: 5;
  }

  h5 {
    position: relative;
    font-size: 2em;
    color: #fff;
    z-index: 6;
    text-shadow: #79808d 3px 3px 3px;
  }
}
.animate__animated.animate__bounceInRight,.animate__bounceInDown,.animate__bounceInLeft, .animate__backInDown {
  --animate-duration: 2s;
}
</style>