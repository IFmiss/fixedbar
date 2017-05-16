(function($){
	//显示固定的右下角菜单
	$.fn.fixedbar = function(options,callBack){
	    return this.each(function(){
	    	var $this = $(this);
			if($this.find('#cpt_fixBar').length){
		      return;
		    }

		    var _this = this;
		    var $this = $(this);
		    var btnIndex;
		    var defualtValue = {
		    	type: 				'',   	//green ,
				menuWidth : 		40,
				positionX : 		50,
				positionY : 		50,
				fontSize:   		16,
				imgHeight: 			120,
				menuDetail: [{
				              fontAwesomeClass:'dw-icon-music icon-2x',
				              title: '播放音乐',
				              hasHref:false,
				              href: '#',
				              imgSrc:'',
				          	},{
				              fontAwesomeClass:'dw-icon-erweicode icon-2x',
				              title: '我的微信号',
				              hasHref:false,
				              href: 'http://www.daiwei.org',
				              imgSrc:'http://www.daiwei.org/index/images/img/erweiCode.png',
				          	},{
				              fontAwesomeClass:'dw-icon-up icon-2x',
				              title: '返回顶部',
				              hasHref:false,
				              href: 'http://www.daiwei.org',
				              imgSrc:'',
				          	}],
				zIndex:100001,
		    };

		    var opt = $.extend(defualtValue,options || {});
		    var length = opt.menuDetail.length;
		    var fixBarHeught = (opt.menuWidth + 10) * (length - 1);    //菜单栏的高度
		    var str = opt.menuWidth;   //菜单栏高度的单位

		    createFixBar();

		    $(document).scroll(function(){
		    	if($(document).scrollTop() > 400){
		    		_this.cpt_fixBar.fadeIn();
		    	}else{
		    		_this.cpt_fixBar.fadeOut();
		    	}
		    })

		    var retData = {
		      	menuDetail:opt.menuDetail,
		    }

		    //获取点击的索引
		    _this.bottonIndex = function(name){
		      	var btnName = name || '';
		      	for(var i = 0;i<opt.menuDetail.length;i++){
		        	if(btnName === opt.menuDetail[i].title){
		          		btnIndex = i;
		        	}
		      	}
		      	return retData.menuDetail[btnIndex];
		    }

		    function createFixBar(){
		      	_this.cpt_fixBar = $('<div class="cpt_fixBar '+opt.type+'" id="cpt_fixBar"></div>').css({
					"width":opt.menuWidth,
					"height":fixBarHeught + str,
					"z-index":opt.zIndex,
					"right":opt.positionX,
					"bottom":opt.positionY,
		      	}).appendTo($this);
		      	_this.listTool = $('<ul class="listTool"></ul>').appendTo(_this.cpt_fixBar);

		      	for(var i = 0; i < length; i++){
		        	var positionImageTop = (i) * opt.menuWidth + (i * 10 / 2 ) - (opt.imgHeight - opt.menuWidth)/2;   //动态获取二维码图片的top值
		        	console.log(positionImageTop);
		        	var imgSrc = opt.menuDetail[i].imgSrc;

		        	if(!opt.menuDetail[i].hasHref){
		        		_this.menu_li = imgSrc==''? $('<li title="'+opt.menuDetail[i].title+'"><i class="'+opt.menuDetail[i].fontAwesomeClass+'"></i></li>').appendTo(_this.listTool):
		        		$('<li title="'+opt.menuDetail[i].title+'"><i class="'+opt.menuDetail[i].fontAwesomeClass+'"></i><div class="div-showimage" style="top:'+positionImageTop+'px;width:'+opt.imgHeight+'px;height:'+opt.imgHeight+'px;right:'+(opt.menuWidth+10)+'px"><img class="erweiCodeImage" src="'+opt.menuDetail[i].imgSrc+'"></div></li>').appendTo(_this.listTool);
		        	}
		        	else{
			           	_this.menu_li = $('<li title="'+opt.menuDetail[i].title+'"><a href="'+opt.menuDetail[i].href+'"><i class="'+opt.menuDetail[i].fontAwesomeClass+'"></i></a></li>').appendTo(_this.listTool);
			        }
			    }
		    }

		    $(_this.listTool).find('li').on('click',function(){
		      	var name = $(this).attr('title');
		       	//获取点击的索引
		       	var indexValue = _this.bottonIndex(name);

		       	// 返回的值
		       	var ret = {
		       		index:btnIndex,
		       		value:indexValue
		       	};

		      	if(typeof(callBack) === 'function'){
		      		callBack(ret);
		      	}else{
		      		console.error('You need a click event callback function, which needs to be written in the callback after defining the plugin');
		      	}
		    });
	    });
	}
})(jQuery);