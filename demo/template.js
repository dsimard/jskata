$(document).ready(function() {
  $.getJSON("https://github.com/api/v2/json/repos/show/dsimard/ready.js?callback=?", {}, function(data, status) {
      var repo = data.repository;
      console.log(repo);
      
      
      var i = 0;
      
      var tests = [
        function() {
          _.t({
            "#info1" : repo.name
          })
        },
        function() {
          _.t({
            id : {
              "<li>" : repo.name
            }
          });
        }
      ];
      
      for (i = 0; i < tests.length; i++)  {
        var id = "test" + i.toString()
        var div = $("<div>").attr("id", id)
        $("#tests").append(div);
        
        console.group("Test #" + i);
        //tests[i](id);
        console.groupEnd();
      }
  });
});
