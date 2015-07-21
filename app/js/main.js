	// This function allows for more complex grids when needed.
	// flexDiv (string) = the class of the div that will have its height adjusted to fit grid
	// staticDiv (string) = the class of the div that does not have its height adjusted.
	// FullHeightDiv (string) = class of div that has height set to the full height. Can be wrapper if needed.
	// basically: total height - staticDiv = flexDiv height
	var fixHeight =  function(flexDiv, staticDiv, fullHeightDiv) {
	
	$(window).on("load resize",function(){
			var totalHeight = $(fullHeightDiv).outerHeight(); // get height of parent div
			var height1 = $(staticDiv).outerHeight(true); // get height of fixed height div
			var height2 = totalHeight - height1; // get new height of flex-height divs
			$(flexDiv).css('height', height2); // set new height of flex-height div
	});
}