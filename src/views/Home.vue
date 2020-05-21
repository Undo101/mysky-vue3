<template>
  <div class="home-page">
    <div class="home-sky">
      <sky></sky>
    </div>
    <div class="home-content">
      <div class="home-head">
        <div class="intro">
          <img src="../assets/images/logo.svg" alt />
          <p>Undo</p>
        </div>
        <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>
        </div>
      </div>
      <div class="home-wrap">
        <div class="catalog">
          <div class="catalog-list">
            <p class="catalog-item">前端沉淀</p>
            <p class="catalog-item">阅读记录</p>
            <p class="catalog-item">生活琐碎</p>
          </div>
        </div>
        <div class="article">
          <div class="article-list">
            <div class="article-item">
              <img src="../assets/images/pic-edit.jpg" alt />
              <div class="article-content">
                <p class="title">An H5 picture editing tool with SVG</p>
                <p class="tag-list">SVG | JS | React | H5</p>
                <p class="text">在react H5项目中还原的一个微信的图片编辑功能组件，设计文档及实现记录。</p>
              </div>
              <a class="article-link" href="https://undo101.github.io/A-picture-edit-tool-by-SVG/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sky from "@/components/sky/index.vue";
export default {
  props: {},
  data() {
    return {};
  },
  components: {
    sky
  },
  mounted() {
    this.$http.get(this.$api.books.books, true).then(result => {
      console.log(result);
    });
  },
  methods: {},
  beforeDestory() {}
};
</script>

<style lang="scss" scoped>
.home {
  &-page {
    height: 100vh;
    position: relative;
  }
  &-sky {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  &-content {
    height: 100%;
    width: 100%;
    padding: 100px 150px 30px;
  }
  &-head {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .intro {
      display: flex;
      img {
        width: 45px;
        height: 45px;
        display: inline-block;
      }
      p {
        color: #fff;
        font-size: 20px;
        margin-left: 16px;
        line-height: 45px;
      }
    }
  }
  &-wrap {
    height: calc(100vh - 185px);
    width: 100%;
    background-color: rgba(98, 98, 102, 0.3);
    border-radius: 5px;
    padding: 20px 15px;
    display: flex;
  }
}
.catalog {
  width: 20%;
  &-list {
    height: auto;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    margin-right: 20px;
    padding: 10px 0;
    p {
      padding: 10px 10px;
      font-size: 16px;
      text-align: left;
      border-bottom: 1px solid rgb(247, 247, 247);
    }
    p:hover {
      color: #ffffff;
      background-color: #1f203e;
    }
  }
}
.article {
  width: 80%;
  &-item {
    margin: 0 auto;
    display: flex;
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 5px;
    color: rgb(155, 153, 153);
    font-size: 16px;
    position: relative;
    img {
      width: 30%;
    }
  }
  &-content {
    margin-left: 16px;
    text-align: left;
    p:first-child {
      font-size: 18px;
      font-weight: 600;
      color: rgb(99, 97, 97);
    }
    p:nth-child(2) {
      font-size: 14px;
      margin-top: 10px;
    }
    p:nth-child(3) {
      font-size: 13px;
      margin-top: 10px;
    }
  }
  &-link {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
  }
}
#nav {
  padding: 20px;
  top: 0;
  background-color: rgba(52, 37, 82, 0.6);
  z-index: 10;
  a {
    font-weight: bold;
    color: #576777;
    &.router-link-exact-active {
      color: #6cc0c3;
    }
  }
}
</style>
