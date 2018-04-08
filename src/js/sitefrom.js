window.setInterval('counter()',1000);
function counter(){
    var date=new Date();
    var startDate=new Date( 2017 , 7 , 6 , 0 , 0 , 0 );
    var time=(date-startDate)/1000;
    var day=Math.floor(time/(24*60*60));
    var hour=Math.floor(time%(24*60*60)/(60*60));
    var minute=Math.floor(time%(24*60*60)%(60*60)/60);
    var second=Math.floor(time%(24*60*60)%(60*60)%60);
    var str="我的博客已经默默运行了" + day + "天" + hour +"时" + minute + "分" + second + "秒";
    document.getElementById('count').innerHTML=str;
}