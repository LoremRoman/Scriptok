// Lista de TODOS los mobs hostiles de Minecraft
const hostileMobs = [
    "blaze", "creeper", "drowned", "elder_guardian", "enderman", 
    "endermite", "evoker", "ghast", "guardian", "hoglin", "husk", 
    "magma_cube", "phantom", "pillager", "ravager", "shulker", 
    "silverfish", "skeleton", "slime", "stray", "vex", "vindicator", 
    "warden", "witch", "zoglin", "zombie", "spider", "cave_spider"
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
    
    // Mostrar fondo del juego seleccionado
    const bg = document.getElementById("background");
    bg.style.backgroundImage = `url(assets/bg-${game}.jpg)`;
    bg.classList.remove("hidden");
    
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

// Añadir regla y actualizar lista
function addRule() {
    const mob = document.getElementById("mob-select").value;
    const coins = parseInt(document.getElementById("coins").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!coins || !quantity) {
        alert("¡Faltan datos!");
        return;
    }

    config.rules.push({ mob, coins, quantity });
    updateMobsList();
}

// Actualizar lista de mobs
function updateMobsList() {
    const list = document.getElementById("mobs-list-content");
    list.innerHTML = "";

    if (config.rules.length === 0) {
        document.getElementById("mobs-list").classList.add("hidden");
        return;
    }

    document.getElementById("mobs-list").classList.remove("hidden");
    
    config.rules.forEach((rule, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${rule.quantity}x ${rule.mob} (${rule.coins} monedas)</span>
            <button onclick="removeRule(${index})">🗑️ Eliminar</button>
        `;
        list.appendChild(li);
    });
}

// Eliminar regla
function removeRule(index) {
    config.rules.splice(index, 1);
    updateMobsList();
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
    log.innerHTML = `<p>Conectando a @${config.tiktokUser}...</p>`;
    
    setTimeout(() => {
        log.innerHTML += `<p>🟢 ¡Conectado al LIVE!</p>`;
        log.innerHTML += `<p>🔔 Prueba: Donación de 100 monedas generaría mobs.</p>`;
    }, 1500);
}
