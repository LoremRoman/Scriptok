const WebSocket = require('ws');
const TikTokLive = require('tiktok-live-connector');
const MCRcon = require('mcrcon');

const wss = new WebSocket.Server({ port: 8080 });
let tiktokClient = null;
let rcon = null;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.action === "start") {
            // Configurar TikTok LIVE
            tiktokClient = new TikTokLive(data.tiktokUser);
            tiktokClient.on('gift', (event) => {
                // Buscar regla aplicable
                const rule = data.rules.find(r => event.gift.coins >= r.coins);
                if (rule) {
                    // Enviar comando a Minecraft
                    rcon = new MCRcon(data.rconHost, data.rconPassword);
                    rcon.connect();
                    for (let i = 0; i < rule.quantity; i++) {
                        rcon.command(`/summon ${rule.mob} ~ ~ ~`);
                    }
                    ws.send(JSON.stringify({ 
                        log: `¡${event.user.unique_id} donó ${event.gift.coins} monedas: ${rule.quantity} ${rule.mob} generados!`
                    }));
                }
            });
            tiktokClient.connect();
        }
    });
});

console.log("Servidor WebSocket iniciado en ws://localhost:8080");
