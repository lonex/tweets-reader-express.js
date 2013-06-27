function addRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell = row.insertCell(0);
    var element = document.createElement("input")
    element.type = "checkbox";
    cell.appendChild(element);

    cell = row.insertCell(1);
    element = document.createElement("input");
    element.type = "checkbox";
    element.className ='select_topic';
    element.name='select_topic';
    element.onclick=function() {select_topic(this)};
    cell.appendChild(element);

    cell = row.insertCell(2);
    element = document.createElement("input");
    element.type = "text";
    cell.appendChild(element);
}

function deleteRow(tableID) {
  try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked) {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }
  }catch(e) {
    //console.log(e);
  }
}

var selectedTopics;

function select_topic(select) {
  var table = $('#topicTable');
  selectedTopics = new Array();
  table.find("input.select_topic[type='checkbox']").each(function() {
	  var topic = $(this).parent().parent().find("input[type='text']");
	  var value = topic.attr('value');
	  if ($(this).is(':checked') && value.length>0) {
	    var found = false;
	    for(var i=0; i<selectedTopics.length;i++) {
	      if (selectedTopics[i] == value) 
	        found = true;
	    };
	    if (!found)
	      selectedTopics.push(value);
	  }
	});
}