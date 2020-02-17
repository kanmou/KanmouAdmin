# KanmouAdmin 看某后台管理框架

#### 一、介绍
看某后台管理模板（KanmouAdmin）,基于jQuery、bootstrap等使用Html、css、js开发。框架拥有菜单模糊搜索功能，方便查询自己想要找的菜单，避免一个栏目一个栏目的寻找浪费时间。出此之外，框架根据左侧垂直菜单的点击生成动态Tab菜单，同时生成iframe页面，易操作性强，功能强大，满足大中小型网站后台布局需求。

#### 二、快速上手

1.  获取地址：https://gitee.com/kanmou/KanmouAdmin
2.  获得KanmouAdmin后，将其完整地部署到你的项目即可。

##### 三、添加左侧菜单

1.  找到KanmouAdmin根目录下的index.html文件，用编辑打开，找到如下代码块：

```html
<!-- 左侧菜单开始 -->
<div class="left-nav bg-light">
  <div id="KanmouMenu" class="KanmouMenu">    
    <ul id="nav-list">     
      <li class="active"><a data-id="view/main.html">首页</a></li>
      <li><a data-id="view/2.html">相册管理</a><span class="KanmouMenu-label">18</span></li>
      <li><a data-id="#">话题管理</a>
        <ul class="submenu">
          <li><a data-id="view/3.html">网页设计</a></li>
          <li><a data-id="#">用户管理</a>
            <ul class="submenu">
              <li><a data-id="#">字体</a></li>
            </ul>
          </li>
          <li><a data-id="#">咨询</a></li>
        </ul>
      </li>
      <li><a data-id="#">留言管理</a></li>
    </ul>
  </div>
</div>
<!-- 左侧菜单结束 -->
```
2. 相关说明```html<ul id="nav-list"> > li```标签为一级菜单，如果其嵌套```html<ul class="submenu"></ul>```为二级（或更多）菜单; ```data-id```为当前菜单的链接页面。如：```data-id="view/main.html"```

#### 四、目录结构

```
KanmouAdmin
├─doc（使用文档目录）
├─public（公共目录，存放插件、css、js等）
│  ├─static
│  │  ├─css
│  │  ├─img
│  │  └─js
│  └─vendor
│      ├─bootstrap
│      │  └─dist
│      │      ├─css
│      │      └─js
│      ├─icons
│      │  └─fonts
│      └─jquery
└─view（视图目录，存放框架的栏目页面）
```

#### 五、KanmouAdmin预览图（2020年2月16日）
<img src="doc/KanmouAdmin200216.png"/>
