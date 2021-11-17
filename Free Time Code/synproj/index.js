waitFor = function(n){
	return new Promise(function(cb){
		setTimeout(cb,n);
	});
};

(function(){

	var answers = {};
	var questions = {
		intro:{
			text:"Hello, what can I help you with today?",
			options:[
				{
					text: "I need a holiday recommendation",
					reply_text: "I need a holiday recommendation!",
					next_question: "weather"
				},
				{
					text: "Cancel",
					reply_text: " ",
					next_question: "weather"
				},
			]
		},
		weather:{
			text:"What kind of weather do you like?",
			options:[
				{
					text: "Cold",
					reply_text: "Cold",
					next_question: "time"
				},
				{
					text: "Warm",
					reply_text: "Warm",
					next_question: "time"
				},
				{
					text: "Hot",
					reply_text: "Hot",
					next_question: "time"
				}
			]
		},	
	};

	// chat area
	(async function(){
		var container = $('#chat-popup');
		var chat_el = container.find('.mainwindow');
		var current_question = {};		

		var message_node = function(type,data){
			var node = $($('template[class=message-'+type+']').html()).clone();
			console.log(type,data);
			node.find('.text').text(data.text);

			if(data.options){
				node.find('.options-list').fadeIn(300);
				for(var option of data.options){
					var btn_node = $('<button class="btn btn-dark mb-1">'+option.text+'</button>');
					btn_node.data('node_data',option);

					btn_node.on('click',async function(){
						var btn_data = $(this).data('node_data');
						console.log("btn_data", btn_data);
						node.find('.options-list').hide();

						var msg = message_node("me",{
							text:btn_data.reply_text
						});

						chat_el.find('.messages').append(msg);
						chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;

						var msg = message_node("agent",questions[btn_data.next_question]);

						chat_el.find('.messages').append(msg);
						chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
					});

					node.find('.options-list').append(btn_node);
				}
			}

			return node;
		}

		current_question = questions.intro;

		var msg = message_node("agent",current_question);
		chat_el.find('.messages').append(msg);

		chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
	})();

})();