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
					next_question: "temperature"
				},				
			]
		},
		temperature:{
			text:"What kind of temperature do you like?",
			options:[
				{
					text: "cold",
					reply_text: "Cold",
					next_question: "rating"
				},
				{
					text: "mild",
					reply_text: "Mild",
					next_question: "rating"
				},
				{
					text: "hot",
					reply_text: "Hot",
					next_question: "rating"
				}
			]
		},	
		rating:{
			text:"What hotel rating are you looking for?",
			options:[
				{
					text: "3",
					reply_text: "3*",
					next_question: "continent"
				},
				{
					text: "4",
					reply_text: "4*",
					next_question: "continent"
				},
				{
					text: "5",
					reply_text: "5*",
					next_question: "continent"
				}
			]
		},
		continent:{
			text:"What continent are you looking to go to?",
			options:[
				{
					text: "North America",
					reply_text: "North America",
					next_question: "price"
				},
				{
					text: "Europe",
					reply_text: "Europe",
					next_question: "price"
				},
				{
					text: "Asia",
					reply_text: "Asia",
					next_question: "price"
				},
				{
					text: "Arctic",
					reply_text: "Arctic",
					next_question: "price"
				},
				{
					text: "Antarctica",
					reply_text: "Antarctica",
					next_question: "price"
				},
				{
					text: "Australia",
					reply_text: "Australia",
					next_question: "price"
				},
				{
					text: "Africa",
					reply_text: "Africa",
					next_question: "price"
				}
			]
		},
		price:{
			text:"What is your budget per night?",
			options:[
				{
					text: "50",
					reply_text: "50$ or less per night",
					next_question: "result"
				},
				{
					text: "100",
					reply_text: "100$ or less per night",
					next_question: "result"
				},
				{
					text: "120",
					reply_text: "120$ or more per night",
					next_question: "result"
				}
			]
		},
		result:{
			text:"Result",
		}
	};

	// chat area
	(async function(){
		var container = $('#chat-popup');
		var chat_el = container.find('.mainwindow');
		var current_question = {};		

		var message_node = function(type,data){
			var node = $($('template[class=message-'+type+']').html()).clone();
			console.log("first log", type,data);
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
		
		const request = ( url, params = {}, method = 'GET' ) => {
			let options = {
				method,
				headers:[]
			};
			if ( 'GET' === method ) {
				url += '?action=holiday_fetch&' + ( new URLSearchParams( params ) ).toString();
				options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			} else {
				options.body = JSON.stringify( params );
				options.headers['Content-Type'] = 'application/json';
			} 
			
			return fetch( url, options ).then( response => response.json() );
		};
		
		const get = ( url, params ) => request( url, params, 'GET' );
		const post = ( url, params ) => request( url, params, 'POST' );
		  
		post('http://localhost:777/v1.0', { temperature: "cold", rating: "4", continent: "Antarctica", price: "130" })
			.then( response => {
				console.log(response);
			});

		current_question = questions.intro;

		var msg = message_node("agent",current_question);
		chat_el.find('.messages').append(msg);

		chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
	})();

})();