//如果初始化后获取值得不到值，需要调换位置顺序。
UE.getEditor('editorContents', {
	  enterTag: "",
      toolbars: [
           ['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'link', 'fontborder', 'backcolor', 'fontsize', 'fontfamily', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify']
      ]
});
var content = UE.getEditor('editorContents').getContent();