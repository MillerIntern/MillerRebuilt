
// All normal Tabs
jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
        
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
        
        jQuery(this).parent('li').siblings().children('div.dropdown-content-sideways').children('a').removeClass('active');
        
        e.preventDefault();
    });
});

//All normal Tabs
jQuery(document).ready(function() {
    jQuery('.tabs .tab-links .dropdown-content-sideways a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
        
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).addClass('active').siblings().removeClass('active');
        
       jQuery(this).parent('div').parent('li').siblings().removeClass('active');
       jQuery(this).parent('div').parent('li').siblings().children('div.dropdown-content-sideways').children('a').removeClass('active');
       
       
        e.preventDefault();
    });
});

//edit Tab for equipment
jQuery(document).ready(function() {		
	

    jQuery('.equipmentt a').on('click', function(e)  {
    	
    	var a = $("#searchEqp").val();
    	if(a!="")
   	 	{
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        editSelected();
    
        
    }});
}
);

// add tab for equipment 
jQuery(document).ready(function() {
	
    jQuery('.equipmenttt a').on('click', function(e)  {
    	var a = $("#searchEqp").val();
    	if(a=="")
   	 {
 
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    }});
}

);

// Back to equipment Tab in Equipment GUI

jQuery(document).ready(function() {
	
	
    jQuery('.backToEquipment a').on('click', function(e)  {
    	
    	
    	
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        clearEquipment();
    });
}

);

//Apply Changes for the equipment list
jQuery(document).ready(function() {
	
	console.log("h1");
		    jQuery('.applyChanges a').on('click', function(e)  {
		    	
		    	if($("#vendor").val()>0  && $("#component").val()>0 && $("#projecteq").val()>0 )
		    		{
		        var currentAttrValue = jQuery(this).attr('href');
		 
		        // Show/Hide Tabs
		        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
		 
		        
		        // Change/remove current tab to active
		        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
		        
		       
		        e.preventDefault();
		        applyEquipment();
		        clearEquipment();
		        console.log("hereee");
		        

    
    }
		    	else
		    		alert("fill all essential information");});
}



);

