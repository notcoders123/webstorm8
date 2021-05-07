<template>
  <div>
    <head>
      <meta charset="UTF-8">
      <title>个人任务管理系统</title>
    </head>
    <body>
    <div id="app">
      <el-container>
        <!--  顶部导航条  -->
        <el-header>
          <el-menu
              class="el-menu-demo"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect">
            <el-menu-item class="logo" index="index">
              <strong># 个人任务管理系统</strong>
            </el-menu-item>
            <el-submenu>
              <template slot="title">
                {{ user.name }}
              </template>
              <el-menu-item index="userEdit">个人资料</el-menu-item>
              <el-menu-item index="userPassword">修改密码</el-menu-item>
              <el-menu-item index="loginOut">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-container>
          <!--  左侧导航条  -->
          <el-aside width="200px">
            <el-col>
              <el-menu
                  default-active="index"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @select="handleSelect">
                <el-menu-item index="index">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-s-shop"></i>
                    <span>娱乐放松</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="amusementLabel">娱乐标签</el-menu-item>
                    <el-menu-item index="amusement">娱乐项目</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-s-flag"></i>
                    <span>个人任务</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="longTermTasks">长期任务</el-menu-item>
                    <el-menu-item index="shortTermTasks">短期任务</el-menu-item>
                    <el-menu-item index="workTasks">工作任务</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="study">
                  <i class="el-icon-reading"></i>
                  <span slot="title">学习安排</span>
                </el-menu-item>
                <el-menu-item index="birthday">
                  <i class="el-icon-info"></i>
                  <span slot="title">生日提醒</span>
                </el-menu-item>
                <el-menu-item index="exercise">
                  <i class="el-icon-s-promotion"></i>
                  <span slot="title">锻炼计划</span>
                </el-menu-item>
                <el-menu-item index="memorandum">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">个人备忘</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>

          <div align="center">
            <el-button type="primary" icon="el-icon-s-open" @click="English()">英语每日一句</el-button>
          </div>
          <ul v-for="item in EnglishS" :key="item">
            <li align="center" style="font-family: myFlower;color: #0f0;font-size: 30px;font-family: FZShuTi">
              {{ item.content }}
            </li>
            <el-divider></el-divider>
            <li align="center" style="font-family:STCaiyun;font-size: 15px;">
              {{ item.note }}
            </li>
            <el-divider></el-divider>
            <li align="center" style="font-family:YouYuan;font-size: 20px;">
              {{ item.date }}
            </li>
          </ul>

        </el-container>
      </el-container>
    </div>
    <div id="main" style="width: 600px;height:400px;left:30%">asd</div>
    </body>

  </div>
</template>

<script>
import {GET} from '@/api'
export default {
  name: "index",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')),
      view: '/view/',
      suffix: '.html',
      EnglishS: [],
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect: function (index, indexPath) {
      if (index == 'loginOut') {
        GET('/login/out')
            // eslint-disable-next-line no-unused-vars
            .then(function (response) {
              sessionStorage.removeItem('user');
              location.href = "/view/login.html"
            }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
      } else {
        location.href = this.view + index + this.suffix;
      }
    },
    English: function () {
      GET('http://api.tianapi.com/txapi/everyday/index?key=e44ed1a306af6ee22296a934fcadd0fa').then(res => {
        console.log(res);
        var b = {};
        b = res.data.newslist[0];
        this.EnglishS.push(b);
      })
    },
    drawCharts() {
      var chartDom = document.getElementById('main');
      var myChart = this.$echarts.init(chartDom);
      myChart.setOption({
        title: {
          text: '当前待做任务',
          subtext: '加油努力',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [{
          name: '任务类型',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
      GET('/Charts/data').then(res => {
        console.log(res);
        myChart.setOption({
          series: [{
            data: [
              {
                value: res.data.data[0],
                name: '娱乐任务'
              },
              {
                value: res.data.data[1],
                name: '锻炼任务'
              },
              {
                value: res.data.data[2],
                name: '长期任务'
              },
              {
                value: res.data.data[3],
                name: '短期任务'
              },
              {
                values: res.data.data[4],
                name: '学习任务'
              }]
          }]
        });
      })
      myChart.on('click', function (params) {
        if (params.dataIndex == 0)
          window.location.href = 'amusement.html';
        if (params.dataIndex == 1)
          window.location.href = 'exercise.html';
        if (params.dataIndex == 2)
          window.location.href = 'longTermTasks.html';
        if (params.dataIndex == 3)
          window.location.href = 'shortTermTasks.html';
        if (params.dataIndex == 4)
          window.location.href = 'study.html';
      });
    }

  }
}
</script>

<style scoped>
body {
  padding: 0px;
  margin: 0px;
}

.el-header {
  color: #333;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  color: #333;
}

.el-menu-demo {
  position: fixed;
  width: 100%;
  z-index: 1999;
  text-align: right;
}

.el-menu-demo .logo {
  margin-left: 30px;
  font-size: 20px;
}

.el-menu--horizontal > .el-submenu {
  float: right;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  margin-right: 100px;
}

.el-menu--horizontal > .el-submenu .el-menu-item {
  width: 100%;
}

.el-menu-vertical-demo {
  position: fixed;
  width: 220px;
  z-index: 1998;
  top: 60px;
  bottom: 0px;
  overflow: auto;
}

.el-row {
  margin-bottom: 20px;

}

last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-purple-light {
  padding: 20px;
  background-color: #ffffff;
}

.el-alert {
  margin-bottom: 30px;
}
</style>