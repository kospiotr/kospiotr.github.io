$(function(){

	var toggleSidebar = $("#togglesidebar");
	var primary = $("#primary");
	var secondary = $("#secondary");

	toggleSidebar.on("click", function(){

		if(primary.hasClass("col-sm-9")){
			primary.removeClass("col-sm-9");
			primary.addClass("col-sm-12");
			secondary.css('display', 'none');
		}
		else {
			primary.removeClass("col-sm-12");
			primary.addClass("col-sm-9");
			secondary.css('display', 'inline-block');
		}
	});

});