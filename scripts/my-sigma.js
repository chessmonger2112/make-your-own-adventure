  $(function(){
    // Let's first initialize sigma:
    s = new sigma('sigma-container');

    y = 1;

    function makeNode(id, label, x, y, size, color)
    {
      var node = {id, label, x, y, size, color};
      node.classz="Im a class";
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
      promptNode = makeNode(initialNodeId, initialNodeLabel, x, initialNodeHeight, 2, "#E00");
        debugger;
      var source = promptNode.id;
      s.graph.addNode(promptNode);
      if (lastOptionNodeId != null) //If previous option node exists, draw edge from that to current prompt
      {
        var lastEdgeID = "lE" + randomNumber;
        var lastEdge = makeEdge(lastEdgeID, lastOptionNodeId, source);
        s.graph.addEdge(lastEdge);
      }
        // debugger;
      currentNode.options.forEach((option, index) => {
        var nodeId = "n" + (index +1) + randomNumber;
        var label = option.option;
        var optionX = x + index;
        var newNode = makeNode(nodeId, label, optionX, y, 1, "#000");

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

    // mapNodes(map);

    s.bind('clickNode', function(event) {
      var label = event.data.node.label;
      console.log(event.data.node.size = 100);
      document.getElementById("currentNode").innerHTML = label;
    });
    // s.refresh();
    // Finally, let's ask our sigma instance to refresh:
});
