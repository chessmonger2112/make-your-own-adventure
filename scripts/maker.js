$(function(){
  console.log("sup!");
  map = {};

  var currentOptions = ["Option1"];
  var currentText = "";





  $("#addOption").click(function() {
    addOption();
    updateOutput();
    addToMap();
  });

  $("#showScenario").click(function() {
    $("#scenario").show();
  });


  function addToMap()
  {
    map.options = currentOptions;
    map.prompt = currentText;
  }

function addOption()
{
  var newOption = $("#newOption").val();
  $("#newOption").val("");
  var newElement = html("li", newOption);
  $(".options").append(newElement);
  currentOptions.push(newOption);
}


function updateOutput()
{
  $("#output").empty();
  updatePrompt();
  updateOptions();
}

function updatePrompt()
{
  var promptString = "";
  promptString += "text: "
  var prompt = $("#prompt").val();
  promptString += prompt;

  promptString += ",";
  var newElement = html("div",promptString);
  currentText = prompt;
  $("#output").append(newElement);
}

function updateOptions()
{
  var optionsString = "";
  var output = $("#output");
  optionsString += "options:[";
  var elementsString = currentOptions.join(", ");
  optionsString += elementsString;

  optionsString += "]";
  output.append(optionsString);
}

function html(element, text="", attributes="")
{
  return `<${element} ${attributes}>${text}</${element}>`;
}
yoh = html;
});
