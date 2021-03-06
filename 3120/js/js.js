// 要显示的中奖列表
var show_list;
// 计数器
var k;
// setTimeout
var st;
// 延迟显示倒计时
var st_num = new Array();
// 延迟显示时间控制列表
var st_list = new Array();
// 当前请求抽奖类型
var id;
// 是否为抽奖状态
var continue_lottery;
// 请求间隔
var time_interval = 2000;
// 每次数量
var count = 20;
// 跳动显示中奖人地址
//var jump_url = "./1920/GetShakeActivityServlet.php";
var jump_url = "servlet/GetShakeActivityServlet";
// 列表显示中奖人地址
//var list_url = "./1920/GetListOfWinnersServlet.php";
var list_url = "servlet/GetListOfWinnersServlet";

$('docment').ready(function(){
	var width 	= document.documentElement.clientWidth;
	var height 	= document.documentElement.clientHeight;
	console.log(width);
	console.log(height);

	// 设置主体高度
	$('.main').css('height', height);
	// 设置倒计时高度和行高
	$('.num').css({
		'height': height,
		'line-height': height + 'px'
	});

	// 点击开始抽奖
	$(document).on('click', '.start_lottery', function(){
		console.log('点击开始抽奖');
		// 隐藏抽奖按钮
		//$('.lottery').fadeOut();
		// 隐藏中奖弹出层
		$('.winner').fadeOut();
		// 设置公共请求类型id
		id = $(this).data('id');
		// 设置可以显示抽奖
		continue_lottery = 1;
		// 清空显示区域
		$('.jump').html('');
		// 展示抽奖奖品
		show_lottery(id);
		// 隐藏按钮
		hide_all_btn();
		// 奖品图片被点击后才开始倒计时
		$('.lottery_list').unbind().click(function(){
			// 开始倒计时
			countdown();
		});
	});

	// 手动停止抽奖
	$(document).on('click', '.end_lottery', function(){
		continue_lottery = 0;
		// 清空显示区域
		$('.jump').html('');
		// 停止请求数据
		clearTimeout(st);
		// 批量清除追加dom st
		for (var i = st_list.length - 1; i >= 0; i--) {
			clearTimeout(st_list[i]);
		}
		// 展示中奖人名单
		show_lottery_list();
	});

	// 手动结束活动
	$(document).on('click', '.end', function(){
		end();
	});

	// 点击结束画面
	$(document).on('click', '.close',function(){
		$('.winner').fadeOut();
		$('.winner_list').html('');
		show_lottery_btn();
	});

	// 倒计时
	function countdown(){
		// 批量清除之前的倒计时
		for (var i = st_num.length - 1; i >= 0; i--) {
			clearTimeout(st_num[i]);
		}
		$('.num .lottery_list img').hide();
		var num = 5;
		$('.num p').show();
		$('.num p').text(num);
		num--;
		// 倒计时
		st_num[1] = setTimeout(function(){$('.num p').text(num);num--;}, 1000);
		st_num[2] = setTimeout(function(){$('.num p').text(num);num--;}, 2000);
		st_num[3] = setTimeout(function(){$('.num p').text(num);num--;}, 3000);
		st_num[4] = setTimeout(function(){
			$('.num p').text(num);
			// 隐藏倒数
			$('.num').fadeOut();
			// 最后的倒计时结束
			if(continue_lottery == 1){
				// 只显示停止按钮
				show_stop_btn();
				// 倒计时结束开始抽奖
				start_lottery();
			}
		}, 4000);
	}

	// 设置显示抽奖奖品
	function show_lottery(lottery_id){
		$('.num .lottery_list img').hide();
		$('.num .lottery_list .lottery_prize_' + lottery_id).show();
		$('.num').fadeIn();
		$('.num p').hide();
	}

	// 抽奖过程
	function start_lottery(){
		console.log('开始跳动展示');
		k = 0;
		// 请求数据
		$.ajax({
		   	type: 	"GET",
		   	url: 	jump_url,
		   	data: 	"fk_batch_code=" + id + '&time_interval=' + time_interval,
		   	success: function(data){
		   		//console.log(data);
		   		show_list = JSON.parse(data);
		   		// 抽奖结束
		   		/*if( (show_list.is_end == 1) || (continue_lottery == 0) ){
					clearTimeout(st);
					// 展示中奖人名单
					show_lottery_list();
					return;
		   		}*/
		   		for (var i = show_list.length - 1; i >= 0; i--) {
		   			st_list[i] = setTimeout(function(){
	   					//console.log(k);
		   				$('.jump').append('<div class="man" style="-webkit-animation:man_top_' + Math.round(Math.random()*4) + ' 3s 1 ease, man_left_' + Math.round(Math.random()*14) + ' 3s 1 ease;"><img src="' + show_list[k].head_imgurl + '"/></div>');
	   					k++;
	   				},Math.round(Math.random() * time_interval) );
		   		}
		   	}
		});
		st = setTimeout(start_lottery, time_interval);
	}

	// 展示中奖名单
	function show_lottery_list(){
		console.log('开始展示中奖人名单');
		// 隐藏中奖奖品展示和倒计时
		$('.num').hide();
		// 清空弹出人头像区域
		$('.winner_list').html('');
		// 显示中奖信息
		//$('.lottery').fadeIn();
		// 显示中奖人列表
		$('.winner').fadeIn();
		// 设置奖品等级背景
		$('.page').attr('class', 'page main-' + id);
		// 请求数据
		$.ajax({
		   	type: 	"GET",
		   	url: 	list_url,
		   	data: 	"fk_batch_code=" + id,
		   	success: function(data){
		   		var data_list = JSON.parse(data);
		   		for (i = data_list.length - 1; i >= 0; i--) {
	   				$('.winner_list').append('<li><img src="' + data_list[i].head_imgurl + '" width="55"><span>' + data_list[i].nickname + '</span></li>');	
		   		}
		   	}
		});

		// 显示抽奖按钮
		hide_all_btn();
	}

	// 隐藏所有按钮
	function hide_all_btn(){
		$('.lottery_button .lottery_button_bldy div').hide();
	}

	// 显示抽奖按钮
	function show_lottery_btn(){
		$('.lottery_button .lottery_button_bldy div').hide();
		$('.lottery_button .lottery_button_bldy .start_lottery').fadeIn();
	}

	// 显示结束按钮
	function show_stop_btn(){
		$('.lottery_button .lottery_button_bldy div').hide();
		$('.lottery_button .lottery_button_bldy .end_lottery').fadeIn();
	}

	// 结束活动
	function end(){
		$('.winner').fadeOut();
		$('.end_show').fadeIn();
	}

});