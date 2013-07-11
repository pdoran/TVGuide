ko.bindingHandlers.activeMenu = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var bindingData = allBindingsAccessor().activeMenu;
        var value = ko.unwrap(valueAccessor());
    	if(bindingContext.$data===value) {
    		$element.addClass("active");
    	} else {
    		$element.removeClass("active");
    	}
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var $element = $(element);
        var bindingData = allBindingsAccessor().activeMenu;
        var value = ko.unwrap(valueAccessor());
    	if(bindingContext.$data===value) {
    		$element.addClass("active");
    	} else {
    		$element.removeClass("active");
    	}
    }
};

ko.bindingHandlers.heartButton = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        $element.html("<i class='icon-plus'></i>");
        var icon = $element.children("i");

        var bindingData = allBindingsAccessor();
        var value = ko.unwrap(valueAccessor());

        $element.css({cursor:"pointer"});
        $element.click(function() {
        	var value = valueAccessor();
        	if(value().indexOf(bindingContext.$data)===-1) {
        		value.push(bindingContext.$data);
        	} else {
        		value.remove(bindingContext.$data);
        	}
        });

    	
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var value = valueAccessor();
		var $element = $(element);
		var icon = $element.children("i");
    	if(value().indexOf(bindingContext.$data)!==-1) {
    		icon.removeClass("icon-plus");
    		icon.addClass("icon-minus");
    	} else {
    		icon.addClass("icon-plus");
    		icon.removeClass("icon-minus");
    	}
    }
}