
const DELETE = 46;
let tableIndex = true;

/*
$('#DataTables_Table_0_length').click(function() {
		console.log("CLICKED ME");
		if(tableIndex == false) $('.tableIndex').remove();
});
*/

$(document).ready( function () {
	
    $('.dataTable').dataTable( {
    	"aaSorting": [],
        "dom": 'T<"clear">lfrtip',
        "fnDrawCallback": function ( oSettings ) {
			if ( oSettings.bSorted || oSettings.bFiltered )
			{
				console.log("O SETTINGS = ", oSettings);
				
				for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
				{
					$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+1 );
				}
				if(oSettings.aoHeader[0][1]){
					console.log("IN THIS");
					if(oSettings.aoHeader[0][1].cell.innerText == "MCS CO#") {$('.tableIndex').remove(); tableIndex = false; console.log("REMOVED IT")}
				}
			}
		},
		"aoColumnDefs": [
			{ "bSortable": false, "aTargets": [ 0 ] }
		],
		"aaSorting": [],
        "tableTools": {
            "sSwfPath": "http://localhost:8080/MillerSite/swf/copy_csv_xls_pdf.swf",
           	"aButtons": [{ "sExtends": "print", "sInfo" : "", "sMessage": "Miller Construction: " + document.title}, "copy", "xls"],
           	
        }
    });
    document.getElementById('DataTables_Table_0_length').onchange = function() {
		console.log("CLICKED ME");
		if(tableIndex == false) $('.tableIndex').remove();
    }
    
    document.getElementById("ToolTables_DataTables_Table_0_0").onclick = function() {
    	console.log("CLICKEDDDDDDD ME");
		if(tableIndex == false) $('.tableIndex').remove();
    } 
} );


$(function() {
    $("body").keypress(function (e) {
        if ((e.which && e.which == DELETE) || (e.keyCode && e.keyCode == DELETE)) {
            deleteRow();
        }
    });
});

function deleteRow()
{
	$('.dataTable').DataTable().row('.selected').remove().draw(false);
}


function printPage()
{
	console.log("PRINTING PAGE");
	//remove extraneous objects from screen
	var menu = document.getElementById("menu");
	menu.style.display = "none";
	
	var header = document.getElementById("header");
	header.style.display = "none";
		
	var button = document.getElementById("printButton");
	button.style.display = "none";
	
	window.print();	
}

function backPage()
{
	document.location.href = "query.html";
}

$(document).ready(function() {
    var table = $('.dataTable').DataTable();
 
    $('.dataTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
	
	$.getScript("js/table2CSV.js", function(){

	 $('table').each(function () {
        var $table = $(this);

        var $button = $("<button type='button'>");
        $button.text("Export to CSV");
        $button.insertAfter($table);

        $button.click(
		function download() {

		document.getElementById("ToolTables_DataTables_Table_0_0").click();
			var csv = $table.table2CSV({
               		delivery: 'value'
            		});

  			var pom = document.createElement('a');
  			pom.setAttribute('href', 'data:text/csv;charset=UTF-8,'+encodeURIComponent(csv));
  			pom.setAttribute('download', "report.csv");

  			pom.style.display = 'none';
  			document.body.appendChild(pom);

  			pom.click();

  			document.body.removeChild(pom);
			$table.page.len(original);
		});
	});
});
});