const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React default port
        methods: ["GET", "POST"]
    }
});

// Mock AI Response Engine for Global/USA Audience (English by default)
function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hey there! Welcome to the arena. Ready for the next match? 🎮";
    } else if (msg.includes('strategy') || msg.includes('help')) {
        return "Pro Tip: Focus on upgrading your core defense before expanding territory. Need more details?";
    } else if (msg.includes('game')) {
        return "This global platform connects players worldwide. Stay sharp!";
    }
    return "Interesting move! Let's see how the community reacts to that strategy.";
}

io.on('connection', (socket) => {
    console.log(`⚡ Player connected: ${socket.id}`);

    // Listen for incoming chat messages
    socket.on('send_message', (data) => {
        // Broadcast user message to everyone
        socket.broadcast.emit('receive_message', data);

        // Check if message mentions AI or if it's a direct game query
        if (data.text.toLowerCase().includes('@ai') || data.isToAI) {
            setTimeout(() => {
                const aiReply = {
                    id: `ai-${Date.now()}`,
                    sender: "Game_AI Bot",
                    text: getAIResponse(data.text),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isAI: true
                };
                io.emit('receive_message', aiReply);
            }, 1000); // 1 second natural delay
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ Player disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
