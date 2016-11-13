$(function(){
console.log("sup");
map = {
  summary: "",
  prompt: "Which way to go?",
  options: [
    {
      option: "Go east",
      next: {
        summary: "You went east.",
        prompt: "You have arrived at Magic Mountain",
        options: [
          {
            option: "Go inside",
            next: {
              summary: "You went inside. Game Over",
              prompt: "",
              options: []
            }
          },
          {
            option: "Loiter outside like a cool kid.",
            next: {
              summary: "You loitered outside so hard, that everyone thinks you're the coolest kid ever. Game Over, you won.",
              prompt: "",
              options: []
            }
          }
        ]
      }
    },
    {
      option: "Go west",
      next: {
        summary: "You went west.",
        prompt: "You have arrived at the ocean",
        options: [
          {
            option: "Go swimming",
            next: {
              summary: "You went swimming. Game Over",
              prompt: "",
              options: []
            }
          },
          {
            option: "Go sunbathing",
            next: {
              summary: "You went sunbathing. Game Over.",
              prompt: "",
              options: []
            }
          }
        ]
      }
    }
  ]
};

var currentNode = map;
var currentPrompt= currentNode.prompt;
var currentOptions = currentNode.options;
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
  currentOptions.forEach((option, index) => $("#options").append(html("li", option.option,"data-index=" + index + " class='option'")));

  $(".option").click(function(event) {
    var currentIndex = Number($(this).data("index"));
    currentNode = currentNode.options[currentIndex].next;
    currentPrompt = currentNode.prompt;
    currentSummary = currentNode.summary;
    currentOptions = currentNode.options;

    renderTurn();
  });
}

function Scenario()
{

}



renderTurn();

});
