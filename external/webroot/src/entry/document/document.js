/**
 * @file 模板脚本入口
 * @author wangjiedong@baidu.com
 */
'use strict';

import $ from 'jquery';
import docAccordionMenu from '../../component/widget/docAccordionMenu';
import marked from '../../component/widget/marked';
//import prettyprint from '../../../bower_components/code-prettify/src/prettify';
import  '../../../bower_components/code-prettify/src/prettify';
window.$ = $;

var lastMdTag = "";
var anchorMap = {
	faceRecognition: {
		"使用须知": "faceRecognition-1",
		"接口规范": "faceRecognition-2",
		"错误信息格式": "faceRecognition-3",
		"人脸识别接口": "faceRecognition-4",
		"APP用户组信息接口": "faceRecognition-5",
		"人脸属性": "faceRecognition-6"
	}
};

var matchAnchor = function (className, cnName) {
	if (anchorMap[className]) {
		return anchorMap[className][cnName];
	}
	else {
		return "";
	}
};

var setAnchorId = function (arr) {
	if (!arr.length) {
		return;
	}
	for (var i=0; i<arr.length; i++) {
		$(arr[i]).attr("id", matchAnchor("faceRecognition", $(arr[i]).text()));
	}
};

var bindLeafNodeScroll = function (clickNode) {
	var scrollToLeafNodeH1 = function (index) {
		var offset = Math.abs($("#md_container>h1").eq(0).offset().top 
			- $("#md_container>h1").eq(index).offset().top);
		$("#md_container").scrollTop(offset)
	};
	var leafNodes = clickNode.parent().find(">ul>li");
	leafNodes.each(function (i, element) {
		$(element).click(function(){
			//console.log("##",i)
			scrollToLeafNodeH1(i);
		});
	});
};

var renderMdPage = function (tagName, clickNode, type) {
	//console.log(lastMdTag);
	if (lastMdTag === tagName) {
		return;
	}
	$.ajax({
		type: "GET",
		url: "/data/" + tagName + ".md",
		success: function(res) {
			lastMdTag = tagName;
			$("#md_container").html(marked(res));
			$("code").addClass("prettyprint");
			PR.prettyPrint();
			if (type === "node"){
				bindLeafNodeScroll(clickNode);
			}
		}
	});
};

var bindAllNodeClick = function () {
	$(".click-node").click(function () {
		var tagName =  $(this).attr("tag");
		if (tagName) {
			renderMdPage(tagName, $(this), "node");
		}
	});
};

var bindAllLeafClick = function () {
	$(".leaf-node").click(function () {
		var tagName =  $(this).attr("tag");
		if (tagName) {
			renderMdPage(tagName, $(this), "leaf");
		}
	});
};

$.ajax({
	type: "GET",
	url: "/data/notice.md",
	success: function(res) {
		$("#md_container").html(marked(res));
		//setAnchorId($("#md_container>h1"));
		$("code").addClass("prettyprint");
		PR.prettyPrint();
	}
});
$(function () {
	$("#jquery-accordion-menu").docAccordionMenu();
});

var renderMenuActive = function () {
	$(".sidebar li").click(function(){
		var thisElement = $(this);
		$(".sidebar li.active").removeClass("active")
		$(this).addClass("active");
		var allParents = thisElement.parents();
		for (var i=0; i<allParents.length; i++) {
			if ($(allParents[i]).hasClass("root")) {
				$(allParents[i]).addClass("active");
				break;
			}
		}
		if (thisElement.hasClass("leaf")) {
			var breadcrumbList = [thisElement.find(">a").text()];
			for (var i=0; i<allParents.length; i++) {
				if ($(allParents[i]).hasClass("non-leaf") || $(allParents[i]).hasClass("root") ) {
					var text = $(allParents[i]).find(">a").text();
					breadcrumbList.splice(0, 0, text);
				}
			}
			var html = "";
			for (var i=0; i<breadcrumbList.length; i++) {
				html += '<li><span class="divider">&gt;</span></li><li><span class="">'
						+ breadcrumbList[i] + '</span></li>';
			}
			//console.log(html)
			$(".doc-breadcrumb .crumb").hide().html(html);
			$(".doc-breadcrumb .crumb li:eq(0)").remove();
			$(".doc-breadcrumb .crumb").show();
		}
	})
}


var bindMinusPlus = function () {
	$(".sidebar .pm-button").click(function () {
		var button = $(this);
		if (button.hasClass("nav-plus1") && button.hasClass("active")) {
			button.removeClass('active');
			$(".toc.jquery-accordion-menu:eq(0)").show(500);
		} else if (button.hasClass("nav-plus1")) {
			button.addClass('active');
			$(".toc.jquery-accordion-menu:eq(0)").hide(500);
		} else if (button.hasClass("nav-plus2") && button.hasClass("active")) {
			button.removeClass('active');
			$(".toc.jquery-accordion-menu:eq(1)").show(500);
		}
		else {
			button.addClass('active');
			$(".toc.jquery-accordion-menu:eq(1)").hide(500);
		}
	});
};

$(function(){
	bindMinusPlus();
	renderMenuActive();
	bindAllNodeClick();
})	
