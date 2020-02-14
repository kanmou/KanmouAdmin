//DOM加载完毕
$(function(){
  autoFit();
  $(".header-nav-item a").hover(function() {
    // alert(1);
  })
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
  $("iframe").height(main-$(".T_tab").height());
  // 左侧导航顶部容器的高度等于右侧TAB容器的高度
  $(".N_top").height($(".T_tab").height());
  // 左侧导航的高度
  $(".left-nav").height(main-$(".N_top").height());
	
  //
  // var winWidth = width($(window).width();
  // var rightWidth =  width($(window).width()-280;

  $(".show-hide a").click(function () {
    // 如果左侧菜单隐藏
    if($(".sidebar").css("display") == 'none'){
      // 右侧容器宽度在原有的基础上减少像素
      // 添加左移动按钮的左边框
      // 还原左侧菜单的宽度
      // 显示左侧菜单
      /*$(".main-right").width(function(index,oldvalue){
       return oldvalue-280;
      });*/
      $(".main-right").css("width",$(window).width()-280)
      $(".roll-left").css("border-left","solid 1px #ddd");   
      $(".sidebar").animate({width:"280px"});      
      $(".sidebar").show();
    }else if($(".sidebar").css("display") == 'block'){
      // 右侧容器宽度在原有的基础上增加像素
      // 移除左移动按钮的左边框
      // 左侧菜单宽度归零
      // 隐藏左侧菜单
      /*$(".main-right").width(function(index,oldvalue){
       return oldvalue+280;
      });*/
      $(".main-right").css("width",$(window).width())
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