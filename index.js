function doalert(checkboxElem,level,name,threatText) {
  if (checkboxElem.checked) {
    if(level == 3 || level == 4){
      alert("caution:"+threatText)
    }else{
      var table = "";
      table += ('<tr><td><td>'+ name + '</td><tr>');
    $('.myTableRight').append(table);
    }
  } else {

  }
}

$(document).ready(function loadXMLDoc(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(this.responseText);
          var m = Math.ceil(resp.length/4)
          var i = 0;
          
          for(var x=0;x<m;x++){
              var p= i+4;
              var element = document.createElement("BUTTON");
              var t = document.createTextNode(""+x);
              element.appendChild(t);
              element.setAttribute("type", "button");
              element.setAttribute("class", "button1");
              element.setAttribute("onclick", "loadXMLDoc("+i+","+p+")");
              document.body.appendChild(element);
              i +=4;
            }
          }
      };
      xhttp.open("GET", "https://web-travel-test.cc.uic.edu/countries", true);
      xhttp.send();
});



function loadXMLDoc(base,val) {
  document.getElementById("wrapper_content").style.display = "block";
  document.getElementById("myTableRight").style.display = "block";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var resp = JSON.parse(this.responseText);
    var data = resp
    document.getElementById("myTable").innerHTML = "";
    $('.myTable').append('<th></th><th> id</th> <th> name </th> <th> threatLevel </th> <th>threatText</th>')
    var table="";
    for(var x=base;x<val;x++){
        var id = data[x]["id"];
        console.log("id"+id)
        var name = data[x]["name"];
        var threatLevel = data[x]["threatLevel"];
        var threatText = data[x]["threatText"];
        table += ('<tr><td><input type="checkbox" name="'+x+'" onchange="doalert(this,'+ threatLevel +',\''+ name +'\',\''+ threatText +'\')" /></td> <td>' + id + '</td> <td>'+ name + '</td> <td> ' + threatLevel +'</td><td>' + threatText +'</td><tr>');
        $('.myTable').append(table);
  }
    }
  };
  xhttp.open("GET", "https://web-travel-test.cc.uic.edu/countries", true);
  xhttp.send();
}