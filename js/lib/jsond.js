
var jsond = (typeof exports !== "undefined" ? exports : window).jsond = (function(){

  function isArray(value) {
      return value && typeof value === "object" && value.constructor === Array;
  }

  function typeofReal(value) {
    return isArray(value) ? "array": value === null ? 'null' : typeof value;
  }
  
  function getType(value) {
    (typeA === "object" || typeA === "array") ? "": String(a) + " ";
  }

  return {

    version: "0.0.1",

    a: [], // first structure
    b: [], // second structure

    feedback: function() {
    },

    swap: function(fn) {
      console.log('>>> swapBoxes()');
      this.a = [this.b, this.b = this.a][0];
      fn(this.a, this.b);      
    },

    clear: function(fn) {
      console.log('>>> clearValues()');
      this.a = this.b = {};
      fn(this.a, this.b);
    },

    compare: function(a, b, name, fn) {

      // To-Do: a and/or b should accept a uri or a json structure.
      // To-Do: this DOM manipulation should be seperated into logic and rendering so that it works with nodejs.
      
      var self = this;
    
      var typeA = typeofReal(a);
      var typeB = typeofReal(b);

      console.log('>>> compare(a=(', typeA, ')', a,
                  ', b=(', typeB, ')', b,
                  ', name=(', typeof name, ')', name,
                  ', results=(', typeof results, ')', results, ')');

      var typeSpanA = document.createElement("span");
      typeSpanA.appendChild(document.createTextNode("(" + typeA + ")"))
      typeSpanA.setAttribute("class", "typeName");

      var typeSpanB = document.createElement("span");
      typeSpanB.appendChild(document.createTextNode("(" + typeB + ")"))
      typeSpanB.setAttribute("class", "typeName");

      var aString = (typeA === "object" || typeA === "array") ? "": String(a) + " ";
      var bString = (typeB === "object" || typeB === "array") ? "": String(b) + " ";

      var leafNode = document.createElement("span");
      leafNode.appendChild(document.createTextNode(name));
      if (a === undefined)
      {
          leafNode.setAttribute("class", "added");
          leafNode.appendChild(document.createTextNode(": " + bString));
          leafNode.appendChild(typeSpanB);
          self.feedback(leafNode);
      }
      else if (b === undefined)
      {
          leafNode.setAttribute("class", "removed");
          leafNode.appendChild(document.createTextNode(": " + aString));
          leafNode.appendChild(typeSpanA);
          self.feedback(leafNode);
      }
      else if (typeA !== typeB || (typeA !== "object" && typeA !== "array" && a !== b))
      {
          leafNode.setAttribute("class", "changed");
          leafNode.appendChild(document.createTextNode(": " + aString));
          leafNode.appendChild(typeSpanA);
          leafNode.appendChild(document.createTextNode(" => " + bString));
          leafNode.appendChild(typeSpanB);

          if (name === 'key') leafNode.setAttribute('class', 'changed key');
          else self.feedback(leafNode);
      }
      else
      {
          leafNode.appendChild(document.createTextNode(": " + aString));
          leafNode.appendChild(typeSpanA);
      }

      if (typeA === "object" || typeA === "array" || typeB === "object" || typeB === "array")
      {
          var keys = [];
          for (var i in a) keys.push(i);
          for (var i in b) keys.push(i);
          keys.sort();

          var listNode = document.createElement("ul");
          listNode.appendChild(leafNode);

          for (var i = 0; i < keys.length; i++)
          {
              if (keys[i] === keys[i - 1])
              continue;

              var li = document.createElement("li");
              listNode.appendChild(li);

              self.compare(a && a[keys[i]], b && b[keys[i]], keys[i], li);
          }

          results.appendChild(listNode);
      }
      else
      {
          results.appendChild(leafNode);
      }
      
    }

  };

})();

