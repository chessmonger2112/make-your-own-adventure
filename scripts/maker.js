$(function(){
console.log("sup!");

//TODO: replace global currentOptions with a local version


map = {}; //by not modifing map explicitly, map will remain the head of the 'linked list'
currentNode = map;
currentNode.options = [];
currentOptions = currentNode.options;

$("#addOption").click(function() {
  addOptionToView(); //needs to be called before obj is added to the array or index will be off by one.
  addToMap();
  resetMap();
  mapNodes(map);
  sendMapToOutput(map); //displays the information of the map to the output window
  bindToScenarios(map); // make dictionary of scenarios
  bindNewScenarios(); //attaching event handler to newly created options
  s.refresh();
});

function resetMap()
{
  s.graph.clear();
  yPositioner = {};
  lastOptionNodeId = null;
  $("#newOption").val("");
  $("#output").empty();
}

function addToMap()
{
  var currentPrompt = $("#prompt").val();
  var newOption = $("#newOption").val();

  currentNode.prompt = currentPrompt;

  var newOptionObj = {option: newOption, next: null};
  currentOptions.push(newOptionObj);
}

 bindNewScenarios = function()
{
  $(".newScenario").unbind().click(function() { //gets called when a new scenario is added
    var index = $(this).data("number");
    var newNode = {summary:"", prompt:"", options:[]};
    currentOptions[index].next = newNode; //attaches the new node to the option
    currentNode = newNode; //variable currentNode now references the newest node.
    currentOptions = newNode.options; //current options now references the newest options array //change to currentNode.options?
    currentPrompt = newNode.prompt;
    clear();
  });
}

function clear()
{
  $(".options").empty();
  $("#prompt").val("");
}

function addOptionToView() //creates and adds the new option to the view
{
  var newOption = $("#newOption").val(); //have this passed in to the function?
  var index = currentOptions.length;
  var newOptionElement = html("div", newOption, "class='option optionEditor'");
  var button = html("button", "New","class='newScenario' data-number=" + index);
  var column1 = html("div", newOptionElement, "class='col-md-10 noPadding' ");
  var column2 = html("div", button, "class='col-md-2 noPadding'");

  var row = html("div", column1 + column2, "class='row'");
  var container = html("div", row, "class='container'");
  var newElement = html("li", row);
  $(".options").append(newElement);
}

function sendMapToOutput(currentNode){
  var prompt = currentNode.prompt;
  console.log("prompt: " + prompt);
  var options = currentNode.options;
  doUpdateWindow(prompt, options);
  options.forEach(option => {
    var next = option.next;
    if (next)
    {
      sendMapToOutput(next)
    }
  });
}

function doUpdateWindow(prompt, options) //updates the json window from map
{
  doUpdatePrompt(prompt);
  doUpdateOptions(options);
}

function doUpdatePrompt(prompt) //updates the prompt in the json window
{
  var promptString = `prompt: ${prompt},`;
  var newElement = html("div", promptString);
  $("#output").append(newElement);
}

function doUpdateOptions(options)
{
  var output = $("#output");
  var elementsString = options.map(option => option.option).join(", ");
  var optionsString = `options:[${elementsString}]`;
  output.append(optionsString);
}

 html = function(element, text="", attributes="")
{
  return `<${element} ${attributes}>${text}</${element}>`;
}

scenarios = {};

function bindToScenarios(currentNode) //iterates of map, and adds every scenario to a dictionary
{
  var prompt = currentNode.prompt;
  if (prompt)
  {
    scenarios[prompt] = currentNode;
  }
  else
  {
    var summary = currentNode.summary;
    scenarios[summary] = currentNode;
  }
  currentNode.options.forEach(option => {
    if (option.next)
    {
      bindToScenarios(option.next)
    }
  });
}

});
