$(function(){
  console.log("sup!");
  map = {};

  var currentOptions = [];
  var currentText = "";


  $("#addOption").click(function() {
    addOption();
    updateOutput();
    addToMap();
  });

  function bindNewScenarios()
  {
    $(".newScenario").unbind().click(function() {
      var index = $(this).data("number");
      console.log("new scenario here! " + index);
    });
  }


  function addToMap()
  {
    map.options = currentOptions;
    map.prompt = currentText;
  }

function addOption()
{
  var newOption = $("#newOption").val();
  var newOptionElement = html("div", newOption, "class='option optionEditor'");
  var index = currentOptions.length;
  currentOptions.push(newOption);

  var button = html("button", "New","class='newScenario' data-number=" + index);
  var column1 = html("div", newOptionElement, "class='col-md-10 noPadding' ");
  var column2 = html("div", button, "class='col-md-2 noPadding'");

  var row = html("div", column1 + column2, "class='row'");
  var container = html("div", row, "class='container'");
  var newElement = html("li", row);

  $("#newOption").val("");
  $(".options").append(newElement);
  bindNewScenarios();
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
  var newElement = html("div", promptString);
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
});
