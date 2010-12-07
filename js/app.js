
if(!window.console){
	window.console = {
		log: function(){},
		debug: function(){},
		warn: function(){},
		dir: function(){}
	};
}

(function() {

  var jsonBoxA, 
    jsonBoxB, 
    n;
    
  var samples = {
    
    a: {
      "__class":"SLUser",
      "displayName":"Sami Samhuri",
      "accountSuspended": false,
      "newAttribute":null,
      "addressStreet1":null,
      "url":null,
      "addressZip":null,
      "email":"foo@bar.com",
      "addressRegion":null,
      "businessName":null,
      "addressStreet2":null,
      "addressCountry":null,
      "hashedPassword":"dc7754ea14e2d4f07bb3ec6a099480f318529dce",
      "uuid":"dc80bc3053d135e52411ce67bd758211"
    },

    b: {
      "__class":"SLUser",
      "displayName":"Foo Bar",
      "accountSuspended": false,
      "addressStreet1":"123 Fake St",
      "url":"bar.com",
      "addressZip":"V9C 0E6",
      "email":"foo@bar.com",
      "addressRegion":"BC",
      "businessName":"stuff",
      "addressStreet2":null,
      "addressCountry":"Canada",
      "hashedPassword":"dc7754ea14e2d4f07bb3ec6a099480f318529dce",
      "uuid":"d0e11b7c73d483335ac7697b042e36c5"
    }

  };

  return {

    Init: function() {

      var self = this;
      
      window.onload = function() {

        console.log('>>> Init()');

        document.addEventListener("click", self.clickHandler, false);

        jsonBoxA = document.getElementById("jsonA");
        jsonBoxB = document.getElementById("jsonB");

        function populateValues(a, b) {
          jsonBoxA.value = JSON.stringify(a);
          jsonBoxB.value = JSON.stringify(b);                  
        }
        
        function populateResults(results) {
          console.log(results)
        }

        document.getElementById("swap").addEventListener("click", function() {
          jsond.swap(populateValues);
        }, false);
        
        document.getElementById("clear").addEventListener("click", function() {
          jsond.clear(populateValues);
        }, false);
        
        document.getElementById("compare").addEventListener("click", function() {
          jsond.compare(JSON.parse(jsonBoxA.value), JSON.parse(jsonBoxB.value), "root", populateResults);
        }, false);

        jsond.feedback = self.markChanged;

        self.assignSamples();
        self.startCompare();

      };

    },

    assignSamples: function() {

      console.log('>>> populateSamples()');
      
      jsonBoxA.value = JSON.stringify(jsond.a = samples.a);
      jsonBoxB.value = JSON.stringify(jsond.b = samples.b);      
      
    },

    startCompare: function () {

      console.log('>>> startCompare()');
      var objA, objB;
      n = 0;

      jsonBoxA.style.backgroundColor = "";
      jsonBoxB.style.backgroundColor = "";

      try {
          objA = eval("(" + jsonBoxA.value + ")");
      } catch(e) {
          jsonBoxA.style.backgroundColor = "rgba(255,0,0,0.5)";
      }
      try {
          objB = eval("(" + jsonBoxB.value + ")");
      } catch(e) {
          jsonBoxB.style.backgroundColor = "rgba(255,0,0,0.5)";
      }

      results = document.getElementById("results");
      while (results.firstChild)
      results.removeChild(results.firstChild);

      jsond.compare(objA, objB, "root", results);
    },

    markChanged: function(node) {
      
      console.log('>>> markChanged()');
    
      document.getElementById('first').style.display = 'block';
      node.setAttribute('id', 'change-' + n);
      n += 1;
      var nextNode = document.createElement('a');
      nextNode.setAttribute('href', '#change-' + n);
      nextNode.appendChild(document.createTextNode('↓ next change ↓'));
      node.appendChild(nextNode);
    },
    
    clickHandler: function(e) {
      
      console.log('>>> clickHandler()');      
      
      e = e || window.event;
      if (e.target.nodeName.toUpperCase() === "UL")
      {
        if (e.target.getAttribute("closed") === "yes")
        e.target.setAttribute("closed", "no");
        else
        e.target.setAttribute("closed", "yes");
      }
    }
    
  }

})().Init();

