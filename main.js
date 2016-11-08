$(function(){
console.log("sup");
var map = {
  text: "Welcome to Mongerville!",
  options: [
    {
      option: "Go left",
      summary: "You went left.",
      text: "You have arrived at Magic Mountain",
      options: [
        {
          option: "Go inside",
          summary: "You went inside. Game Over",
          text: "You went inside. Game Over",
          options: []
        },
        {
          option: "Loiter outside like a cool kid.",
          summary: "You loitered outside so hard, that everyone thinks you're the coolest kid ever. Game Over, you won.",
          text: "You loitered outside so hard, that everyone thinks you're the coolest kid ever. Game Over, you won.",
          options: []
        }
      ]
    },
    {
      option: "Go right",
      summary: "You went right.",
      text: "You have arrived at the ocean",
      options: [
        {
          option: "Go swimming",
          text: "You went swimming. Game Over",
          summary: "You went swimming. Game Over",
          options: []
        },
        {
          option: "Go sunbathing",
          text: "You went sunbathing. Game Over.",
          summary: "You went sunbathing. Game Over.",
          options: []
        }
      ]
    }
  ]
};

var currentNode = map;
var currentText = currentNode.text;
var currentOptions = currentNode.options;

function html(element, text)
{
  return `<${element}>${text}</${element}>`;
}

function renderTurn()
{
  $("#currentText").text(currentText);
  $("#options").empty();
  currentOptions.forEach(option => $("#options").append(html("li", option.option)));
}

$("#go").click(function(event) {
  var selectedNumber = $("#selectedNumber").val();
  console.log("I go! " + selectedNumber);
  var currentIndex = selectedNumber - 1;
  currentNode = currentNode.options[currentIndex];
  currentText = currentNode.text;
  currentOptions = currentNode.options;

  renderTurn();
});

renderTurn();

});
