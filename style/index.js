$(function(){

	//只能进行一些简单的运算，不能连续运算（不按C清零就会出错），功能还是欠考虑

	var oInput = $("input");
	var aButton = $(".show");
	var oClear = $(".clear")
	var oBack = $(".back");
	var oResult= $(".result")
	var value = "";

	aButton.on("click",addValue);
	oClear.on("click",clear);
	oBack.on("click",back);
	oResult.on("click",result);



	function addValue(){  //连接显示字符窜
		var _this = $(this);
		value += _this.html();
		oInput.val(value);
	
	}

	function clear(){  //清除显示
		value = "";
		oInput.val(value);
	}

	function back(){  //返回
		var len = value.length;
		value = value.substring(0,len-1);
		oInput.val(value);
	}

	function result(){
		var re1 = /\+/;
		var re2 = /\-/;
		var re3 = /\*/;
		var re4 = /\//;
		//分别以加减乘除符号匹配对应函数，划分传入参数value1和value2
		if( re1.test(value) ) {  
			// alert(value);
			var index = value.indexOf("+");
			var value3 = "";
			var value1 = value.substring(0,index);
			var value2 = value.substring(index+1,value.length);
			value3 = plus(value1,value2);
			oInput.val(value3);			
		}else if( re2.test(value) ) {
			var index = value.indexOf("-");
			var value3 = "";
			var value1 = value.substring(0,index);
			var value2 = value.substring(index+1,value.length);
			value3 = sub(value1,value2);
			oInput.val(value3);		
		}else if( re3.test(value) ) {
			var index = value.indexOf("*");
			var value3 = "";
			var value1 = value.substring(0,index);
			var value2 = value.substring(index+1,value.length);
			value3 = mul(value1,value2);
			oInput.val(value3);		
		}else if( re4.test(value) ) {
			var num = 0;
			var index = value.indexOf("/");
			var value3 = "";
			var value1 = value.substring(0,index);
			var value2 = value.substring(index+1,value.length);
			value3 = division(value1,value2);
			oInput.val(value3);
		}
	}



	function plus(value1, value2){
		var arr1 = [];
		var arr2 = [];
		var arr = [];
		var result = "";
		var len = null;
		var longArr = [];
		var shortArr = [];
		for(var i=0;i<value1.length;i++ ){  //先将字符窜转化成数字进行运算
			arr1[i] = Number(value1.charAt(i));
		}
		for(var i=0;i<value2.length;i++ ){  
			arr2[i] = Number(value2.charAt(i));
		}
		if( arr1.length>=arr2.length ){  //选用长度长的作为数组长度
			len = arr1.length;
			longArr = arr1;
			shortArr = arr2;
		}else{
			len = arr2.length;
			longArr = arr2;
			shortArr = arr1;
		}
		// console.log(len);
		for( var i=0;i<len;i++ ) {  //长度不够时进行补齐
			// console.log(shortArr[i]);
			if( shortArr[i]===undefined ) {
				shortArr.unshift(0);
			}
		}


		for( var i=len-1;i>=0;i-- ){  //从后网前进行借位运算
			if( longArr[i]+shortArr[i]>=10 ) {
				longArr[i-1] = longArr[i-1] +1;
			}
			arr.unshift( Math.abs(( longArr[i]+shortArr[i])%10 ) ) ;

		}
		if( longArr[0]+shortArr[0]>=10) {  //最后一位手动添加
			arr.unshift(1);
		}
		console.log(longArr);
		console.log(shortArr);
		console.log(arr);
		for( var i=0;i<arr.length;i++ ) { //将各位转换为字符串
			result += arr[i].toString();
		}
		return result;

	}


	//减法操作和假发类似，不同之处在于始终用值大的减去小的，再进行符号判断
	function sub(value1,value2) {
		var arr1 = [];
		var arr2 = [];
		var arr = [];
		var result = "";
		var len = null;
		for(var i=0;i<value1.length;i++ ){
			arr1[i] = Number(value1.charAt(i));
		}
		for(var i=0;i<value2.length;i++ ){
			arr2[i] = Number(value2.charAt(i));
		}
		if( arr1.length>=arr2.length ){
			len = arr1.length;
		}else{
			len = arr2.length;
		}
		console.log(len);
		for( var i=0;i<len;i++ ) {
			// console.log(shortArr[i]);
			if( arr1[i]===undefined ) {
				arr1.unshift(0);
			}else if( arr2[i]===undefined ) {
				arr2.unshift(0);
			}
		}

		if( Number(value1)>=Number(value2) ) {
			for( var i=len-1;i>=0;i-- ){
				if( arr1[i]-arr2[i]<0 ) {
					arr1[i] += 10;
					arr1[i-1] = arr1[i-1] -1;
				}
				arr.unshift( Math.abs(( arr1[i]-arr2[i]) ) ) ;

			}				
		}else{
			for( var i=len-1;i>=0;i-- ){
				if( arr2[i]-arr1[i]<0 ) {
					arr2[i] += 10;
					arr2[i-1] = arr2[i-1] -1;
				}
				arr.unshift( Math.abs(( arr2[i]-arr1[i]) ) ) ;

			}
			arr.unshift("-");
		}
		
		for( var i=0;i<arr.length;i++ ) {
			result += arr[i].toString();
		}
		return result;

	}

	//想了很久都没想到好的办法用字符串解决乘除法，所以就用了数字的运算，但是是字符串，还不能算带负数的，等想到好的方法再一起改掉这个buggbb吧
	function mul(value1,value2) {
		var num1 = Number(value1);
		console.log(num1);
		var num2 = Number(value2);
		var result = num1*num2;
		return result;
	}


	function division(value1, value2) {
		var num1 = Number(value1);
		console.log(num1);
		var num2 = Number(value2);
		var result = num1/num2;
		return result;
	}

});