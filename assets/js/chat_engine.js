class ChatEngine
{
    constructor(chatBoxId,userEmail)
    {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler()
    {
        let self = this;
        console.log(this.userEmail);
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Connectus'
            });

            self.socket.on('user_joined',function(data){
                console.log('A User joined',data);
            });
        });

        // send a message on clicking the send button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
           
            if(msg != '')
            {
                self.socket.emit('send_message',{
                    
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Connectus'
                });
            }
        });
        self.socket.on('receive_message',function(data){
                console.log('Message Recieved',data.message);

            let newMessage = $('<li>');

            let messageType = 'others-message';
            if(data.user_email == self.userEmail)
            {
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.user_email
            }));

            newMessage.addClass(messageType);
            console.log(newMessage);
            $('#chat-message-list').append(newMessage);
        });
    }
}