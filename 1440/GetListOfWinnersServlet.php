<?php
	$arr0 = [];
	for($i = 0; $i < 1; $i++){
		$arr0[] = [
			'head_imgurl' => 'http://172.16.102.125/javascript/jnh/imgs/'.rand(0,4).'.jpg',
			'nickname' => '名称' . rand(10,99)
		];
	}

	$arr1 = [];
	for($i = 0; $i < 5; $i++){
		$arr1[] = [
			'head_imgurl' => 'http://172.16.102.125/javascript/jnh/imgs/'.rand(0,4).'.jpg',
			'nickname' => '名称' . rand(10,99)
		];
	}

	$arr2 = [];
	for($i = 0; $i < 50; $i++){
		$arr2[] = [
			'head_imgurl' => 'http://172.16.102.125/javascript/jnh/imgs/'.rand(0,4).'.jpg',
			'nickname' => '名称' . rand(10,99)
		];
	}

	$arr3 = [];
	for($i = 0; $i < 100; $i++){
		$arr3[] = [
			'head_imgurl' => 'http://172.16.102.125/javascript/jnh/imgs/'.rand(0,4).'.jpg',
			'nickname' => '名称' . rand(10,99)
		];
	}

	$error = [
		'is_end' => 1
	];

	if($_GET['fk_batch_code'] == 0){$json = $arr0;}
	if($_GET['fk_batch_code'] == 1){$json = $arr1;}
	if($_GET['fk_batch_code'] == 2){$json = $arr2;}
	if($_GET['fk_batch_code'] == 3){$json = $arr3;}

	echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>