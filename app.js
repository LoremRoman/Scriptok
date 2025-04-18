// Lista de TODOS los mobs hostiles de Minecraft
const hostileMobs = [
    "zombie", "skeleton", "creeper", "spider", "enderman", "witch", "slime", 
    "ghast", "blaze", "magma_cube", "phantom", "drowned", "husk", "stray", 
    "vex", "vindicator", "evoker", "pillager", "ravager", "guardian", "elder_guardian",
    "shulker", "silverfish", "endermite", "hoglin", "zoglin", "warden"
];

let config = {
    game: null,
    tiktokUser: "",
    isLive: false,
    rules: []
};

// Seleccionar juego
function selectGame(game) {
    config.game = game;
    document.getElementById("game-select").style.display = "none";
    document.getElementById("config-form").style.display = "block";
    document.getElementById("game-title").textContent = `CONFIGURACIÓN: ${game.toUpperCase()}`;

    let html = "";
    if (game === "minecraft") {
        html = `
            <div class="input-group">
                <label for="rcon-password">Contraseña RCON:</label>
                <input type="password" id="rcon-password" placeholder="contraseña">
            </div>
            <div class="input-group">
                <label for="mob-select">Mob Hostil:</label>
                <select id="mob-select">
                    ${hostileMobs.map(mob => `<option value="${mob}">${mob}</option>`).join("")}
                </select>
            </div>
            <div class="input-group">
                <label for="coins">Monedas requeridas:</label>
                <input type="number" id="coins" placeholder="100">
            </div>
            <div class="input-group">
                <label for="quantity">Cantidad de mobs:</label>
                <input type="number" id="quantity" placeholder="1" min="1" max="100">
            </div>
            <button onclick="addRule()">AÑADIR REGLA</button>
        `;
    } else if (game === "pvz") {
        html = `
            <div class="input-group">
                <label for="pvz-path">Ruta del ejecutable PvZ:</label>
                <input type="text" id="pvz-path" placeholder="C:/Program Files/PvZ/pvz.exe">
            </div>
        `;
    }
    document.getElementById("game-options").innerHTML = html;
}

// Añadir regla de donación
function addRule() {
    const mob = document.getElementById("mob-select").value;
    const coins = parseInt(document.getElementById("coins").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!coins || !quantity) {
        alert("¡Faltan datos!");
        return;
    }

    config.rules.push({ mob, coins, quantity });
    alert(`Regla añadida: ${quantity} ${mob} por ${coins} monedas`);
}

// Guardar configuración
function saveConfig() {
    config.tiktokUser = document.getElementById("tiktok-username").value;
    alert("¡Configuración guardada! Haz clic en ON para empezar.");
}

// Iniciar/detener conexión
function toggleLive() {
    const btn = document.getElementById("live-btn");
    config.isLive = !config.isLive;

    if (config.isLive") {
        btn.textContent = "ON";
        btn.style.background = "#4CAF50";
        document.getElementById("live-status").style.display = "block";
        startConnection();
    } else {
        btn.textContent = "OFF";
        btn.style.background = "#5a3e2b";
        document.getElementById("live-status").style.display = "none";
    }
}

// Conectar a TikTok LIVE (simulación)
function startConnection() {
    const log = document.getElementById("event-log");
    log.innerHTML += `<p>Conectando a @${config.tiktokUser}...</p>`;
    // Aquí iría la conexión real con WebSocket/API
}
