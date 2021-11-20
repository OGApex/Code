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
					response: "",  
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
                    response:"cold",
                    text: "Cold weather",
                    reply_text: "Cold weather",
                    next_question: "rating"
                },
                {
                    response:"mild",
                    text: "Warm weather",
                    reply_text: "Warm weather",
                    next_question: "rating"
                },
                {
                    response:"hot",
                    text: "Hot weather",
                    reply_text: "Hot weather",
                    next_question: "rating"
                }
            ]
        },   
		rating:{
			text:"What hotel rating are you looking for?",
			options:[
				{
					response: "3",
					text: "3*",
					reply_text: "3*",
					next_question: "continent"
				},
				{
					response: "4",
					text: "4*",
					reply_text: "4*",
					next_question: "continent"
				},
				{
					response: "5",
					text: "5*",
					reply_text: "5*",
					next_question: "continent"
				}
			]
		},
		continent:{
			text:"What continent are you looking to go to?",
			options:[
				{	
					response: "North America",
					text: "North America",
					reply_text: "North America",
					next_question: "price"
				},
				{
					response: "Europe",
					text: "Europe",
					reply_text: "Europe",
					next_question: "price"
				},
				{
					response: "Asia",
					text: "Asia",
					reply_text: "Asia",
					next_question: "price"
				},
				{
					response: "Arctic",
					text: "Arctic",
					reply_text: "Arctic",
					next_question: "price"
				},
				{
					response: "Antarctica",
					text: "Antarctica",
					reply_text: "Antarctica",
					next_question: "price"
				},
				{
					response: "Australia",
					text: "Australia",
					reply_text: "Australia",
					next_question: "price"
				},
				{
					response: "Africa",
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
					response: "50",
					text: "50$ or less per night",
					reply_text: "50$ or less per night",
					next_question: "result",
				},
				{
					response: "100",
					text: "100$ or less per night",
					reply_text: "100$ or less per night",
					next_question: "result",
				},
				{
					response: "120",
					text: "120$ or more per night",
					reply_text: "120$ or more per night",
					next_question: "result",
				}
			]
		},
		result:{
			text:"",
		}
	};

	// chat area
	(async function(){
		var container = $('#chat-popup');
		var chat_el = container.find('.mainwindow');
		var query = {};	

		const request = ( url, params = {}, method = 'GET' ) => {
			let options = {
				method,
				headers:{}
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

		var add_message = (type, text) => {
			var node = $($('template[class=message-'+type+']').html()).clone();
			  
			node.find('.text').text(text);
			return node;
		}

		var message_node = function(type,question){
			let data = questions[question];
			var node = add_message(type, data.text)
			
			node.find('.text').text(data.text);


			if(data.options){
                node.find('.options-list').fadeIn(300);
                for(let option of data.options){
                    let btn_node = $('<button class="btn btn-dark mb-1"></button>').text(option.text);

                    btn_node.on('click',async function(){
                        node.find('.options-list').hide();

                        if(option.response){
                            query[question] = option.response;
                        }

                        let msg = add_message("me", option.reply_text);

                        chat_el.find('.messages').append(msg);
                        chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;                                    

                        chat_el.find('.messages').append(msg);
                        chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
						
						msg = message_node("agent",option.next_question);

                        chat_el.find('.messages').append(msg);
                        chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
					

                    });
                    node.find('.options-list').append(btn_node);
                }
            } else {
                post('http://localhost:777/v1.0', { action: "holiday_fetch", params:query}).then( response => {
				console.log(response);
				let msg = add_message("agent", response.reply);
				chat_el.find('.messages').append(msg);
                chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
				});
            
			}		  
			return node;		

		}
		var msg = message_node("agent", "intro");
		chat_el.find('.messages').append(msg);		

		chat_el.find('.messages-area')[0].scrollTop = chat_el.find('.messages-area')[0].scrollHeight;
	})();

})();