var myText = documnet.getElementBYId("my-text");
var res = document.getElementById("result");
var limit = 1000;
result.textContent = 0 + "/" + limit;

NoStyleItemContext.addEventListner("input",function(){
    var textLength = myText.value.length;
    console.log(textLength);
});
