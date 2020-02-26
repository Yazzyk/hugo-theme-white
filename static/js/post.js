document.querySelectorAll('pre code').forEach((block) => {
  hljs.highlightBlock(block);
});

_($('.postContent img')).forEach((imgs)=>{
  $(imgs).wrap(()=>{
    return '<a href="' + imgs.src + '" target="_blank"></a>';
  })
})

$("pre").attr("style","");
$("pre code").addClass("hljs");
$("span").attr("style","");