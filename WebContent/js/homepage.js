
function loadPosts()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'action': 'getPosts',
		},
		complete: function(data)
		{
			if(data.responseText.slice(0, -1) == 'VERIFICATION_FAILURE') {returnToLogin(); return;}
			
			showPosts(data.responseJSON);
		},
	});//ajaxcall
}

function showPosts(json)
{
	fixDates(json);
	for(var i = 0; i < json.length; i++)
	{
		var node = document.createElement("li");
		node.onclick = function(){hide(this)};

		$(node).append("<p class='postTitle'>" + json[i].title + "</p>");
		$(node).append("<p class='postText'>" + json[i].text + "</p>");
		$(node).append("<p class='author'>- " + json[i].author + " on " + 
									json[i].postDate + "</p>");
		
		$("#posts").append(node);
	}
}

function hide(param)
{
	if($(param).hasClass('isHidden'))
	{
		$(param).removeClass('isHidden');
		$(param).children('.postText').css('display', 'block');
		$(param).children('.author').css('display', 'block');
	}
	else
	{
		$(param).addClass('isHidden');
		$(param).children('.postText').css('display', 'none');
		$(param).children('.author').css('display', 'none');
	}
}

function fixDates(data)
{
	for(var i = 0; i < data.length; i++)
	{
		data[i].postDate = data[i].postDate.slice(0, 11);
	}
}

function createPost()
{
	$("#newPost").css("display", "block");
}

function submit()
{
	var title = $("#newPostTitle").val();
	var text = $("#newPostText").val();
	
	if(title != "" && text != "")
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'action': 'postPost',
				'title': title,
				'text': text,
			},
			complete: function(data)
			{
				console.log(data);
				if(data.responseText.slice(0, -1) == 'VERIFICATION_FAILURE') {returnToLogin(); return;} 
				
				$("#newPost").css('display', 'none');
				$("#newPostTitle").val("");
				$("#newPostText").val("");		
				
				location.reload();
			},
		});//ajaxcall
	else
		alert("Fill in all post information!");
}

function discard()
{
	$("#newPost").css('display', 'none');
	$("#newPostTitle").val("");
	$("#newPostText").val("");
}