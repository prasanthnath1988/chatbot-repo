
		$(document).ready(function() {
			$("#input").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					send();
					$('#input').val('');
				}
			});
			$("#rec").click(function(event) {
				switchRecognition();
			});
		});
		var recognition;
		function startRecognition() {
			recognition = new webkitSpeechRecognition();
			recognition.onstart = function(event) {
				updateRec();
			};
			recognition.onresult = function(event) {
				var text = "";
			    for (var i = event.resultIndex; i < event.results.length; ++i) {
			    	text += event.results[i][0].transcript;
			    }
			    setInput(text);
				stopRecognition();
			};
			recognition.onend = function() {
				stopRecognition();
			};
			recognition.lang = "en-US";
			recognition.start();
		}
	
		function stopRecognition() {
			if (recognition) {
				recognition.stop();
				recognition = null;
			}
			updateRec();
		}
		function switchRecognition() {
			if (recognition) {
				stopRecognition();
			} else {
				startRecognition();
			}
		}
		function setInput(text) {
			$("#input").val(text);
			send();
		}
		function updateRec() {
			$("#rec").html(recognition ? "<img src='../img/mic_play.gif' height='40' width='40'/>" : "<img src='../img/mic_stop.png'  height='40' width='40'/>");
		}
		function send() {
			var flang=1;
			var text = $("#input").val();
			 $(".botui-actions-buttons").last().remove();
			
				botui.message.human({
			      delay: 500,
			      content: text
			    }).then(function () {
			socket.emit('fromClient', { client : text }); // sends the message typed to server
      console.log(text); // will print whatever was typed in the field.
// })
// .then(function () {

     

    });
			   


			
		}
		