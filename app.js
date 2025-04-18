// Lista de TODOS los mobs hostiles de Minecraft (actualizada a 2023)
const hostileMobs = [
    "blaze", "creeper", "drowned", "elder_guardian", "ender_dragon", 
    "enderman", "endermite", "evoker", "ghast", "guardian", "hoglin", 
    "husk", "illusioner", "magma_cube", "phantom", "pillager", "ravager", 
    "shulker", "silverfish", "skeleton", "slime", "stray", "vex", 
    "vindicator", "warden", "witch", "zoglin", "zombie", "zombie_villager", 
    "spider", "cave_spider"
];

let config = {
    game: null,
    tiktokUser: "",
    isLive: false,
    rules: []
};

// Cambiar fondo según juego seleccionado
function updateBackground(game) {
    const bg = document.querySelector(".background");
    bg.style.backgroundImage = `url(assets/bg-${game}.jpg)`;
}

// Seleccionar juego
function selectGame(game) {
    config.game = game;
    updateBackground(game);
    
    // Ocultar selección y mostrar formulario
    document.getElementById("game-select").classList.add("hidden");
    document.getElementById("config-form").classList.remove("hidden");
    
    // Actualizar título
    const gameTitle = document.getElementById("game-title");
    const gameIcon = document.getElementById("game-icon");
    gameTitle.textContent = `CONFIGURACIÓN: ${game.toUpperCase()}`;
    gameIcon.textContent = game === "minecraft" ? "⛏️" : "🌱";
    
    // Generar opciones del juego
    let html = "";
    if (game === "minecraft") {
        html = `
            <div class="input-group">
                <label>🔑 Contraseña RCON:</label>
                <input type="password" id="rcon-password" placeholder="contraseña_rcon">
            </div>
            <div class="input-group">
                <label>👹 Mob Hostil:</label>
                <select id="mob-select">
                    ${hostileMobs.map(mob => `<option value="${mob}">${mob.replace("_", " ")}</option>`).join("")}
                </select>
            </div>
            <div class="input-group">
                <label>💰 Monedas requeridas:</label>
                <input type="number" id="coins" placeholder="100" min="1">
            </div>
            <div class="input-group">
                <label>🔢 Cantidad de mobs:</label>
                <input type="number" id="quantity" placeholder="1" min="1" max="100">
            </div>
            <button onclick="addRule()" class="add-rule">➕ AÑADIR REGLA</button>
        `;
    } else if (game === "pvz") {
        html = `
            <div class="input-group">
                <label>🖥️ Ruta del ejecutable:</label>
                <input type="text" id="pvz-path" placeholder="C:/Program Files/PvZ/pvz.exe">
            </div>
        `;
    }
    document.getElementById("game-options").innerHTML = html;
}

// Añadir regla
function addRule() {
    const mob = document.getElementById("mob-select").value;
    const coins = parseInt(document.getElementById("coins").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!coins || !quantity) {
        alert("¡Faltan datos!");
        return;
    }

    config.rules.push({ mob, coins, quantity });
    alert(`✅ Regla añadida:\n${quantity} ${mob} por ${coins} monedas`);
}

// Guardar configuración
function saveConfig() {
    config.tiktokUser = document.getElementById("tiktok-username").value;
    
    if (config.game === "minecraft") {
        config.rconPassword = document.getElementById("rcon-password").value;
    } else if (config.game === "pvz") {
        config.pvzPath = document.getElementById("pvz-path").value;
    }
    
    alert("¡Configuración guardada! Haz clic en ON para empezar.");
}

// Iniciar/detener conexión
function toggleLive() {
    const btn = document.getElementById("live-btn");
    config.isLive = !config.isLive;

    if (config.isLive) {
        btn.textContent = "🟢 ON";
        btn.classList.remove("off");
        btn.classList.add("on");
        document.getElementById("live-status").classList.remove("hidden");
        startConnection();
    } else {
        btn.textContent = "⚪ OFF";
        btn.classList.remove("on");
        btn.classList.add("off");
        document.getElementById("live-status").classList.add("hidden");
    }
}

// Simular conexión (reemplazar con WebSocket real)
function startConnection() {
    const log = document.getElementById("event-log");
    log.innerHTML += `<p>Conectando a @${config.tiktokUser}...</p>`;
    
    // Simular eventos de donación (eliminar en producción)
    setTimeout(() => {
        log.innerHTML += `<p>🟢 Conectado al LIVE!</p>`;
        log.innerHTML += `<p>🔔 Ejemplo: 100 monedas → 1 creeper</p>`;
    }, 1500);
}
