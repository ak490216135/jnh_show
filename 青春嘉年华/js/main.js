/*方案干预结果*/
$(document).ready(function(){
    $("#addTable").click(function(){
       var tr="<tr><td style= 'width:28%'><textarea></textarea>"+
              "</td><td style= 'width:28%'><textarea></textarea></td><td style= 'width:28%'><textarea></textarea></td><td id='list-1'  style= 'width:16%'><a href='#' onclick=del_tr(this)>删除</a></td></tr>";
　  　$("#table").append(tr)
    });
})

function del_tr(obj){
	$(obj).parent().parent().remove();
}

/*侧边栏*/
$(document).ready(
	function () {
    	$(".left li").click(function () {
        	$(this).addClass("current").siblings().removeClass("current");
    })
});