    function toggleChatbox() {
      const chatbox = document.getElementById('chatbox');
      const floatingIcon = document.getElementById('floatingIcon');

      if (chatbox.style.display === 'none') {
        chatbox.style.display = 'block';
        floatingIcon.style.display = 'none';
      } else {
        chatbox.style.display = 'none';
        floatingIcon.style.display = 'flex';
      }
    }
    
    document.getElementById('userInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  
             sendMessage();  
        }
    });

 async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const message = encodeURIComponent(userInput.value);

  if (message.trim() === '') return;

  appendMessage('user', decodeURIComponent(message));
   
  try { 
    var response = await fetch('https://chatbot.cpf.or.ke/ask-question/'+message, {
      method: 'GET',
    });
     
     
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    
    function processChunk({ done, value }) {
      if (done) {
        console.log("Stream complete");
        return ;
      }
      const chunk = decoder.decode(value, { stream: true });
      appendMessage('bot', chunk || 'No reply received from server');
     
      return reader.read().then(processChunk);  
    }  
    
    var dataresponse = reader.read().then(processChunk);	 
    
  } catch (error) {
    appendMessage('bot', 'Sorry, something went wrong.');
  } 

  userInput.value = '';
}

 
    function appendMessage(sender, text) {
      const chatboxBody = document.getElementById('chatboxBody');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.innerText = text;

      chatboxBody.appendChild(messageElement);

       chatboxBody.scrollTop = chatboxBody.scrollHeight;
    }

     async function loadChatHistory() {
      try {
      //alert( msg.text)
        const response = await fetch('https://chatbot.cpf.or.ke/ask-question/'+ msg.text);
        //const data = await response.json();
        /*data.messages.forEach(msg => {
          appendMessage(msg.sender, msg.text);
        });*/
        appendMessage(msg.sender, msg.text);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }

     window.onload = function() {
      loadChatHistory();
    };