/*
 * Handle logic for page setup and "Add Apartment" 
 * button that the view builds 
 */

var addTableController = function() {
	return this;
};

addTableController.prototype.loadView = function () {
	var model = new addTable();
	var view = new addTableView(model);
	view.render();
};

var buttonPanelController = function() {
	return this;
};

buttonPanelController.prototype.loadView = function () {
	var model = new buttonPanel();
	var view = new buttonPanelView();
	view.render();
};

var displayRowController = function() {
	return this;
};

//Make this the displayRowController event listener/handler that handles the "Add Apartment" onclick
//event passed to it by the buttonPanelView
displayRowController.prototype.addApartment = function () {
	//Set up AJAX request with inputted data
	var submitRequest = new XMLHttpRequest();
	var text0 = document.getElementById("text0").value;
	var text1 = document.getElementById("text1").value;
	var text2 = document.getElementById("text2").value;
	var text3 = document.getElementById("text3").value;
	var text4 = document.getElementById("text4").value;

	//Validate that all input fields were filled in
	if (text0 == "" || text1 == "" || text2 == "" || text3 == "" || text4 == ""){
		alert("Please fill in all of the information fields when adding a new apartment");
		return;
	}
	var data = "text0=" + text0 + "&" + "text1=" + text1 + "&" + "text2=" + text2 + "&" + "text3=" + text3 + "&" + "text4=" + text4;
	
	//Open the request, set the header, and send the data
	submitRequest.open('POST', 'submit.php', true);
	submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	submitRequest.send(data);
		
	//After the data has been sanitized, display on the HTML page within ftable
	submitRequest.onreadystatechange = display_data;
	function display_data() {
		if (submitRequest.readyState == 4) {
			if(submitRequest.status == 200) {
				data=submitRequest.responseText;
				var model = new displayRow(data);
				var view = new displayRowView(model);
				view.render(model);
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};
};

displayRowController.prototype.loadView = function (data) {
	var fields = data;
	var model = new displayRow(fields);
	var view = new displayRowView(model);
	view.render(model);
};