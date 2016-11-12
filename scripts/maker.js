$(function(){
  console.log("sup!");



  $("#addOption").click(function() {
    var newOption = $("#newOption").val();
    var newElement = html("li", newOption);
    $(".options").append(newElement);

  });


function html(element, text, attributes="")
{
  return `<${element} ${attributes}>${text}</${element}>`;
}

});
