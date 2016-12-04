$(function(){
console.log("sup");


function Scenario(summary, prompt, options)
{
  this.summary = summary;
  this.prompt = prompt;
  this.options = options;
}

var sunbathing = new Scenario("You went sunbathing. Game Over.", "", []);
var swimming = new Scenario("You went swimming. Game Over", "", []);
var loitering = new Scenario("You loitered outside so hard, that everyone thinks you're the coolest kid ever. Game Over, you won.", "",[]);
var inside = new Scenario("You went inside. Game Over", "", []);
var east = new Scenario("You went east.", "You have arrived at Magic Mountain", [
          {
            option: "Go inside",
            next: inside
          },
          {
            option: "Loiter outside like a cool kid.",
            next: loitering
          }
        ]);
var west = new Scenario("You went west.", "You have arrived at the ocean", [
          {
            option: "Go swimming",
            next: swimming
          },
          {
            option: "Go sunbathing",
            next: sunbathing
          }
        ]);

var start = new Scenario("", "Which way to go?", [
    {
      option: "Go east",
      next: east
    },
    {
      option: "Go west",
      next: west
    }
  ]);


map = start;

currentNode = map;
var currentPrompt= currentNode.prompt;
currentOptions = currentNode.options;
var currentSummary = currentNode.summary;

function html(element, text, attributes)
{
  return `<${element} ${attributes}>${text}</${element}>`;
}

function renderTurn()
{
  $("#currentPrompt").text(currentPrompt);
  $("#summary").text(currentSummary);
  $("#options").empty();
  var newElement = html("li", option.option,"data-index=" + index + " class='option'");
  currentOptions.forEach((option, index) => $("#options").append(newElement));

  $(".option").click(function(event) {
    var currentIndex = Number($(this).data("index"));
    currentNode = currentNode.options[currentIndex].next;
    currentPrompt = currentNode.prompt;
    currentSummary = currentNode.summary;
    currentOptions = currentNode.options;

    renderTurn();
  });
}

renderTurn();

});
