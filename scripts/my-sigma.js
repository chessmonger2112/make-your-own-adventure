  $(function(){
    // Let's first initialize sigma:
    s = new sigma('sigma-container');

    y = 1;

    function makeNode(id, label, x, y, size, color, scenario)
    {
      var node = {id, label, x, y, size, color, scenario};
      return node;
    }

    function makeEdge(id, source, target)
    {
      var edge = {id, source, target};
      return edge;
    }

    yPositioner = {};
    lastOptionNodeId = null;

    mapNodes = function (currentNode)
    {
      var randomNumber = Math.random();
      var initialNodeHeight = y + .25;
      if (yPositioner[y] == null)
      {
        yPositioner[y] = 0;
      }
      else
      {
        yPositioner[y] ++;
      }
      var x = .5 + yPositioner[y] * 2;

      y++;

      var initialNodeId = "m0" + randomNumber;
      var initialNodeLabel = currentNode.prompt;
      promptNode = makeNode(initialNodeId, initialNodeLabel, x, initialNodeHeight, 2, "#E00", initialNodeLabel);
      var source = promptNode.id;
      s.graph.addNode(promptNode);
      if (lastOptionNodeId != null) //If previous option node exists, draw edge from that to current prompt
      {
        var lastEdgeID = "lE" + randomNumber;
        var lastEdge = makeEdge(lastEdgeID, lastOptionNodeId, source);
        s.graph.addEdge(lastEdge);
      }
      currentNode.options.forEach((option, index) => {
        var nodeId = "n" + (index +1) + randomNumber;
        var label = option.option;
        var optionX = x + index;
        var newNode = makeNode(nodeId, label, optionX, y, 1, "#000", initialNodeLabel);

        var edgeId = "e" + index + randomNumber;
        var newEdge = makeEdge(edgeId, source, newNode.id);

        s.graph.addNode(newNode);
        s.graph.addEdge(newEdge);
        lastOptionNodeId = nodeId;

        if (!option.next || option.next.options.length === 0)
        {
            // var summaryStatement = option.next.summary;
            // var summaryId = "summary" + index + randomNumber;
            // var summaryNode = makeNode(summaryId, summaryStatement, optionX, y + .25, 1, "#00F");

            // var summaryEdgeId = "sE" + index + randomNumber;
            // var summaryEdge = makeEdge(summaryEdgeId, lastOptionNodeId, summaryId);
            // s.graph.addNode(summaryNode);
            // s.graph.addEdge(summaryEdge);
        }
        else
        {
          mapNodes(option.next);
        }
      });
      y --;
    }

function doAddOptionToView(newOption, index) //creates and adds the new option to the view
{
  var newOptionElement = html("div", newOption, "class='option optionEditor'");
  var button = html("button", "New","class='newScenario' data-number=" + index);
  var column1 = html("div", newOptionElement, "class='col-md-10 noPadding' ");
  var column2 = html("div", button, "class='col-md-2 noPadding'");

  var row = html("div", column1 + column2, "class='row'");
  var container = html("div", row, "class='container'");
  var newElement = html("li", row);
  $(".options").append(newElement);
}

    s.bind('clickNode', function(event) {
      var scenario = event.data.node.scenario;
      currentNode = scenarios[scenario];
      currentOptions = currentNode.options;
      console.log(scenario);
      $(".options").empty();

      var currentPrompt = currentNode.prompt;
      $("#prompt").val(currentPrompt);
      currentOptions.forEach((option, index) => {
        // $("#options").append(html("li", option.option,"data-index=" + index + " class='option'")));
      doAddOptionToView(option.option, index);
      bindNewScenarios();
      });
    });
    // s.refresh();
    // Finally, let's ask our sigma instance to refresh:
});
