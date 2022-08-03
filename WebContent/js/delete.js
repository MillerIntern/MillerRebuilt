$(document).ready(function()
{
	$('.deleteSubContractor').click(function(){
		console.log("get proj item", id);
		$.ajax({
			type: 'POST',
			url: 'DeleteSubContractor',
			data: {
				'domain': 'project',
				'action': 'getProjectItem',
				'id': id
			
			}, complete: function (data) {
				console.log("projItem: ", data.responseJSON);
				fillNavScopeDropdowns(data.responseJSON);
			}, error: function (data) {
				alert("error!");
				console.log("data", data);
			}
		
		});
	});
});