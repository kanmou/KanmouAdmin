/****************************************************
 * @softwareName KanmouAdmin
 * @version v20200214
 * @author 看某<kanmou@qq.com>
 * @link www.kanmou.net
 * @license [url] [description]
 * @copyright (c)看某,版权所有
 ****************************************************/
$(function(){
  autoFit();
  $(".header-nav-item a").hover(function() {
    // alert(1);
  })

  /**
   * [KanmouMenu description]
   * @type {String}
  */
  var pluginName = "KanmouMenu";
  var settings = {
      speed: 300,//规定元素从可见到隐藏的速度（或者相反）。默认为 "normal"。
      showDelay: 0,//显示延时
      hideDelay: 0,//隐藏延时
      singleOpen: false,//单一开关，手风琴样式
      items: [],
  };
function test() {
  alert('111111');
}
  /**
   * [Plugin 给对象添加属性和方法、初始化插件]
   * @param {[type]} element [description]
   * @param {[type]} options [description]
   */
  function Plugin(element, options) {
      this.element = element;
      this.settings = $.extend({},
      settings, options);
      this._settings = settings;
      this._name = pluginName;
      this.init()
  };

          
  /**
   * [init description]
   * @param  {[type]} )  init    [封装函数，初始化]
   * @param  {[type]} clickMenu  [菜单点击事件]
   * @return {[type]}            [description]
   */
  $.extend(Plugin.prototype, {init: function() {        
      // 子菜单标志
      this.submenuSign();        
      // 菜单点击事件
      this.clickMenu();
      // 创建菜单搜索表单
      this.menuSearch($("#form"), $("#nav-list"));
      this.closeTab();
      this.clickTab();             
  },
  // TAB菜单关闭点击事件
  closeTab:function () {
    $(".tab-panel").on('click','span',function(e) {
      e.stopPropagation();//防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数。
      var dataId = $(this).parent().attr("data-id");
      var nextDataId = $(this).parent().next().attr("data-id");
      var prevDataId = $(this).parent().prev().attr("data-id");
      // 判断当前TAB选项是否激活
      if ($(this).parents().hasClass("active")) {
        // 判断是否有下一个tab选项
        // 如果存在，则激活下一个选项菜单，否则激活上一个
        // 同时激活相应的ifram页面
        if ($(this).parent().next().length>0) {          
          // 激活下一个tab选项卡及对应的iframe页面
          $(this).parent().next().addClass("active");
          $(".k_iframe iframe[src='"+nextDataId+"']").css("display","");          
        }else{
          // 激活下一个tab选项卡及对应的iframe页面
          $(this).parent().prev().addClass("active");
          $(".k_iframe iframe[src='"+prevDataId+"']").css("display",""); 
        }
      }
      // 删除当前选项卡及其对应的iframe页面
      $(this).parent().remove();
      $(".k_iframe iframe[src='"+dataId+"']").remove();
    });
  },
  /**
   * [clickTab description]
   * @return {[type]} [description]
   */
  clickTab: function() {
      // 绑定元素a的点击事件
      $(".tab-panel").on('mousedown','a',function(e) {
        e.stopPropagation();
        e.preventDefault();
        var dataId = $(e.target).attr("data-id");
        var nextDataId = $(e.target).next().attr("data-id");
        var prevDataId = $(e.target).prev().attr("data-id");
        // alert($(e.target).hasClass("tab-close"));
        if(3 == e.which){
          if (($(e.target).hasClass("tab-close"))) {return false;}
             // 鼠标右键属性菜单
            $(this).contextPopup({
                // title: '这是右键菜单',
                items: [
                  {label:'关闭标签',
                    action:function() {
                      if($(e.target).hasClass("active")){
                        if ($(e.target).next().length>0) {          
                          // 激活下一个tab选项卡及对应的iframe页面
                          $(e.target).next().addClass("active");
                          $(".k_iframe iframe[src='"+nextDataId+"']").css("display","");          
                        }else{
                          // 激活下一个tab选项卡及对应的iframe页面
                          $(e.target).prev().addClass("active");
                          $(".k_iframe iframe[src='"+prevDataId+"']").css("display",""); 
                        }
                      }
                      // 删除当前选项卡及其对应的iframe页面
                      $(e.target).remove();
                      $(".k_iframe iframe[src='"+dataId+"']").remove();
                    }
                  },

                    {label:'关闭其他标签',
                    action:function() { alert('开发中 2') } },

                    {label:'关闭左侧标签',
                    action:function() { alert('开发中 3') } },
                    
                    {label:'关闭右侧标签',
                    action:function() { alert('开发中 4') } },
                    null, // divider
                    {label:'刷 新',
                    action:function() { alert('开发中 5') } },
                    null, // divider
                    {label:'退 出',
                    action:function() { return false; } }
                ]
            });        
      }else if(1 == e.which){// 左键点击事件
        // 过滤单独点击tab关闭按钮
        if($(e.target).text() == '×'){return false;}
          // 当前tab的左偏移值
          var thisTab = $(this).offset().left;
          // 当前tab的宽度
          var thisTabWidth = $(this).width()+30;
          // 向右移动按钮的左偏移值
          var rollRight = $(".roll-right").offset().left;
          // 被遮挡的区域（宽度）
          var obscuredArea = rollRight -(thisTab+thisTabWidth);

          // 如果当前菜单没有激活，移除其他已激活菜单，激活当前菜单
          if (!$(this).hasClass("active")) {
              $(".tab-panel a").removeClass("active");
              $(this).addClass("active");

              $(".k_iframe iframe").css("display","none");
              $(".k_iframe iframe[src='"+$(this).attr("data-id")+"']").css("display","");
          }
          // 显示当前激活的TAB菜单被遮挡的区域
          if (thisTab < $(".main-left").width()+40) {
              var temp = $(".main-left").width()+40-thisTab;
              $(".tab-panel").css("left",($(".tab-panel").position().left+temp)+"px");
          }            
          // 向左偏移相应的值，确保当前激活的TAB完全显示
          if (obscuredArea<0) {
              $(".tab-panel").css("left",(parseInt($(".tab-panel").css("left"))+obscuredArea));
          } 
        } 
        
          
      })
  },
      // 菜单点击事件
      /**
       * [clickMenu description]
       * @return {[type]} [description]
       */
      clickMenu: function() {
          $(this.element).children("ul").find("li").bind("click touchstart",function(e) {                
              e.stopPropagation();
              e.preventDefault();
              // 获取当前元素(不包括子元素)
              var aLabel = $(this)
                  .clone()        //复制元素
                  .find("i,span") //获取子元素i和span
                  .remove()       //删除所有子元素
                  .end();         //回到选择的元素
              // 顶级菜单内容（不含有子菜单的菜单）
              if (!$(this).children(".submenu").length > 0) {                        
                  var title = $.trim(aLabel.text()),                       
                      dataId = ($(this).children("a").attr("data-id")),
                      // tabId = ($(this).children("a").attr("tab-id")),
                      // 组合tab标签
                      aHtml = '<a href="javascript:;" class="tab-option active"'+
                      'data-id="'+dataId+'">'+title+'<span class="tab-close" title="关闭">×</span></a>',
                      // 组合ifram标签
                      iframeHtml = '<iframe name="iframe0" width="100%" height="100%"' +
                      'src="'+dataId+'" frameborder="0"></iframe>'
                  
                  // 增加Tab菜单，同时对应增加iframe页面
                  // 
                  // Tab标签中是否已经有打开的标签
                  if($(".tab-option[data-id='"+dataId+"']").attr("data-id")==dataId){
                      $(".tab-panel a").removeClass("active");
                      $(".tab-option[data-id='"+dataId+"']").addClass("active");

                      $(".k_iframe iframe").css("display","none");
                      $(".k_iframe iframe[src='"+dataId+"']").css("display","");
                  }else{
                      $(".tab-panel a").removeClass("active");
                      $(".tab-panel").append(aHtml);
                      // Tab面板的宽度减去TAB内容容器的宽度
                      var tabMoreWidth = $(".tab-panel").width()-
                          ($('.content-tabs').width()-$(".roll-left").width()*3+4);
                      if (tabMoreWidth > 0) {
                          // TAB面板向左偏移
                          $(".tab-panel").css("left","-"+tabMoreWidth+"px");
                      }
                      $(".k_iframe iframe").css("display","none");
                      $(".k_iframe").append(iframeHtml);
                  }

              }
              if($(this).parent(".submenu").length > 0){
                  // 移除顶级菜单的激活状态
                  // 移除兄弟元素的激活状态
                  // 激活当前元素的父及元素
                  // 激活当前元素
                  $("#nav-list li").removeClass();
                  $(this).siblings("li").removeClass();
                  $(this).parents("li").addClass("active");
                  $(this).addClass("active");
              }else{                    
                  // 解除兄弟元素的激活状态
                  // 激活当前元素
                  $(this).siblings("li").removeClass();                    
                  $(this).addClass("active");
              }
              // 当前元素存在子元素
              if ($(this).children(".submenu").length > 0) {
                  
                  // 如果当前子元素显示
                  if ($(this).children(".submenu").css("display") == "none") {
                     //$(this).parent().removeClass();
                      
                      // "submenu-signs"类
                      $(this).children(".submenu").delay(settings.showDelay).slideDown(settings.speed);
                      $(this).children(".submenu").siblings("a").addClass("submenu-signs");
                      //手风琴菜单开启
                      if (settings.singleOpen) {
                          //子元素隐藏；移除子元素下的兄弟元素的"submenu-signs"类
                          $(this).siblings().children(".submenu").slideUp(settings.speed);
                          $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-signs")
                      }
                      return false
                  } else {
                      // 子元素从可见到延时隐藏（或者相反）
                      // settings.hideDelay延时时间
                      // settings.speed隐藏（展开)速度
                      $(this).children(".submenu").delay(settings.hideDelay).slideUp(settings.speed);
                  }
                  // 如果当前元素的子元素下的兄弟元素a标签存在"submenu-signs"类，则移除该类。
                  if ($(this).children(".submenu").siblings("a").hasClass("submenu-signs")) {                        
                      $(this).children(".submenu").siblings("a").removeClass("submenu-signs");
                  }

              }
          })
      },
      /**
       * [submenuSign description]
       * @return {[type]} [description]
       */
      submenuSign: function() {
          // 如果当前菜单下存在子菜单
          if ($(this.element).find(".submenu").length > 0) {
              // 当前菜单添加子菜单标志
              $(this.element).find(".submenu").siblings("a").append("<span class='submenu-sign'>+</span>")
          }
      },

      /**
       * [menuSearch 菜单搜索]
       * @param  {[type]} header [头部]
       * @param  {[type]} list   [列表]
       * @return {[type]}        [description]
       */
      menuSearch: function(header, list) {
          var form = $("<form>").attr({
              "class":"filterform",
              action:"#"
          }), input = $("<input>").attr({
              "class":"menu-search",
              type:"text",
              "placeholder":"输入关键字搜索",
          });
          $(form).append(input).appendTo(header);
          $(input).change(function() {
              var filter = $(this).val();
              if (filter) {
                  $matches = $(list).find("a:Contains(" + filter + ")").parents();
                  $("li", list).not($matches).slideUp();
                  $matches.slideDown();
              } else {
                  $(list).find("li").slideDown();
              }
              return false;
          }).keyup(function() {
              $(this).change();
          });
      }
  });
  // 定义伪类选择器(菜单)
  /**
   * [Contains description]
   * @param {[type]} a [description]
   * @param {[type]} i [description]
   * @param {[type]} m [description]
   */
  $.expr[":"].Contains = function(a, i, m) {
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };
  /**
   * [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  $.fn[pluginName] = function(options) {
      this.each(function() {
          if (!$.data(this, "plugin_" + pluginName)) {
              $.data(this, "plugin_" + pluginName, new Plugin(this, options))
          }
      });
      return this
  };

  // 右键菜单
  /**
   * [contextPopup 右键菜单弹出插件]
   * @param  {[type]} menuData [菜单数据]
   * @return {[type]}          [description]
   */
  $.fn.contextPopup = function(menuData) {
      // 定义默认设置
      var settings = {items: []};

      // 数组合并
      $.extend(settings, menuData);

      // 创建右键菜单面板
      function createMenu(e) {
      var menu = $('<ul class="contextMenu"></ul>').appendTo(document.body);
      // 遍历items数组
      settings.items.forEach(function(item) {
        if (item) {
          var rowCode = '<li><a href="#"><span></span></a></li>';
          var row = $(rowCode).appendTo(menu);
          row.find('span').text(item.label);
          if (item.action) {
            row.find('a').click(function(){ item.action(e); });
          }
        } else {
          $('<li class="divider"></li>').appendTo(menu);
        }
      });
      return menu;
      }

      // 绑定右键菜单
      this.bind('contextmenu', function(e) {    
      var menu = createMenu(e).show();

      var left = e.pageX + 5, /* 向右微移，指针覆盖标题 */
          top = e.pageY;
      if (top + menu.height() >= $(window).height()) {
          top -= menu.height();
      }
      if (left + menu.width() >= $(window).width()) {
          left -= menu.width();
      }

      // 创建显示右键菜单
      menu.css({zIndex:1000001, left:left, top:top})
        .bind('contextmenu', function() { return false; });

      // 蒙版，当蒙版被点击时关闭右键菜单窗口。
      var mask = $('<div></div>')
        .css({left:0, top:0, width:'100%', height:'100%', position:'absolute',zIndex:1000000})
        .appendTo(document.body)
        .bind('contextmenu click', function() {
          // 移除蒙版、右键菜单。
          mask.remove();
          menu.remove();
        });

      // 右键菜单点击事件，移除蒙版及右键菜单窗口
      menu.find('a').click(function() {
        mask.remove();
        menu.remove();
      });
      return false;
  });
  return this;
};
  //绑定看某菜单插件运行
  $("#KanmouMenu").KanmouMenu();
});

//浏览器窗口的大小发生变化
$(window).resize(function () {
   	autoFit();    
});

// 自适应浏览器窗口大小
function autoFit() {
	// 主容器高度
	var main  = $(window).height()-$(".header").height()-$(".footer").height();
	$(".main").height(main);
  // iframe高度
  $(".k_iframe").height(main-$(".tab-box").height());
  // 左侧导航顶部容器的高度等于右侧TAB容器的高度
  $(".nav-top-box").height($(".tab-box").height());
  // 左侧导航的高度
  $(".left-nav").height(main-$(".nav-top-box").height());
  // alert($(".tab-box").height());
	
  //
  

  $(".show-hide a").click(function () {
    var winWidth = $(window).width();
    var rightWidth =  $(window).width()-280;
    // 如果左侧菜单隐藏
    if($(".sidebar").css("display") == 'none'){
      // 右侧容器宽度在原有的基础上减少像素
      // 添加左移动按钮的左边框
      // 还原左侧菜单的宽度
      // 显示左侧菜单
      $(".main-right").animate({width:rightWidth});
      $(".roll-left").css("border-left","solid 1px #ddd");   
      $(".sidebar").animate({width:"280px"});      
      $(".sidebar").show();
    }else if($(".sidebar").css("display") == 'block'){
      // 右侧容器宽度在原有的基础上增加像素
      // 移除左移动按钮的左边框
      // 左侧菜单宽度归零
      // 隐藏左侧菜单
      $(".main-right").animate({width:winWidth});
      $(".roll-left").css("border-left","none");  
      $(".sidebar").animate({width:"0px"});      
      $(".sidebar").hide(300);      
    }
  });
  // 如果左侧菜单显示，右侧容器宽度等于窗口宽度减左侧菜单容器宽度，反知。
  if ($(".sidebar").css("display") == 'block') {
    $(".main-right").width($(window).width()-$(".main-left").width());
  }else{
    $(".main-right").width($(window).width());
  }
}