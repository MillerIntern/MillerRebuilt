


/**
 * This script controls the manipulation of tabs in the equipment section of project creation/edit
 * @author Kenneth Bayron
 *
 */

// All normal Tabs
jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});


//Edit Tab for equipment
jQuery(document).ready(function() {	
	
	
	
    jQuery('.equipmentt a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
        editSelected();
    });
}
);



// New equipment 
 jQuery(document).ready(function()
{
	 $a =0;
 //if($("#searchEqp").val()=="")
 if(a==1)
	 {
   jQuery('.equipmenttt a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
       
    });
   
 }  
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
	
	
		    jQuery('.applyChanges a').on('click', function(e)  {
		        var currentAttrValue = jQuery(this).attr('href');
		 
		        // Show/Hide Tabs
		        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
		 
		        
		        // Change/remove current tab to active
		        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
		        
		       
		        e.preventDefault();
		        applyEquipment();
		        clearEquipment();
    
    });
}
);

