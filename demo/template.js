$(document).ready(function() {
  $.getJSON("https://github.com/api/v2/json/repos/show/dsimard/ready.js?callback=?", {}, function(data, status) {
      var repo = data.repository;
      console.log(repo);
      
      var tests = [
        function() {
          _.t({
            "#info1" : repo.name
          })
        },
        function() {
          _.t({
            "#info2" : {
              "<li>" : repo.name
            }
          });
        }
      ];
      
      for (var i = 0; i < tests.length; i++)  {
        console.group("Test #" + i);
        tests[i]();
        console.groupEnd();
      }
  });
});
