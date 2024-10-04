// Chatbot Script
        const chatMessages = document.getElementById('chatMessages');
        
        // Predefined responses
        const botResponses = {
            "welcome_message": "Hi there! Please choose from the options below:",
            "options": {
                "Option2": {
                    "response": "Retail careers offer a holistic approach that connects key industry stakeholders",
                    "followup": ["Option1", "Option2", "Main Menu"]
                },
                "Option1": {
                    "response": "This integrated approach equips ambitious professionals with the necessary skills.",
                    "followup": ["Option1 Benefits", "Option1 Benefits", "Main Menu"]
                },
                "Main Menu": {
                    "response": "Please choose from the options below:",
                    "followup": ["Option1", "Option2", "Option3", "Option4", "Option5", "Live Agent"]
                },
                "Live Agent": {
                    "response": "You can chat with a live agent via WhatsApp by clicking the link below:",
                    "whatsapp_link": "<a href='https://wa.me/yournumber?text=Hi,%20I%20need%20assistance' target='_blank'>Click here to chat on WhatsApp</a>",
                    "followup": ["Main Menu"]
                }
            }
        };
        
        // Initialize chatbot with the welcome message and options
        function initializeChatbot() {
            appendMessage('bot', botResponses.welcome_message);
            showOptions(["Option1", "Option2", "Option3", "Option4", "Option5", "Live Agent"]);
        }
        
        // Function to append messages to chat
        function appendMessage(sender, message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            messageElement.innerHTML = message;  // Use innerHTML to allow for clickable links
            chatMessages.appendChild(messageElement);
        
            // Scroll to bottom when new message is added
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to display options as buttons
        function showOptions(options) {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');
        
            options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.innerText = option;
                button.addEventListener('click', () => handleOptionSelection(option));
                optionsContainer.appendChild(button);
            });
        
            chatMessages.appendChild(optionsContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Handle the option selection
        function handleOptionSelection(option) {
            // Remove previous options
            const optionsContainer = document.querySelector('.options-container');
            if (optionsContainer) optionsContainer.remove();
        
            // Show user's selected option
            appendMessage('user', option);
        
            // Provide bot's response and new follow-up options
            const botResponse = botResponses.options[option];
            if (botResponse) {
                setTimeout(() => {
                    appendMessage('bot', botResponse.response);
                    if (option === "Live Agent") {
                        appendMessage('bot', botResponse.whatsapp_link); // Show clickable WhatsApp link
                    }
                    showOptions(botResponse.followup);
                }, 500); // Delay to simulate typing
            } else {
                appendMessage('bot', "I'm sorry, I don't understand that.");
                showOptions(["Main Menu"]); // Fall back to Main Menu option
            }
        }
        
        // Initialize the chatbot on page load
        initializeChatbot();
