let config = {
    game: null,
    tiktokUser: "",
    isLive: false,
    rules: []
};

// Configura el juego seleccionado
function setupGame(game) {
    config.game = game;
    document.getElementById("game-select").style.display = "none";
    document.getElementById("config-form").style.display = "block";

    let html = "";
    if (game === "minecraft") {
        html = `
            <input id="rcon-password" type="password" placeholder="Contraseña RCON">
            <select id="mob-select">
                <option value="zombie">Zombie</option>
                <option value="creeper">Creeper</option>
            </select>
        `;
    }
    document.getElementById("game-options").innerHTML = html;
}

// Guarda la configuración
function saveConfig() {
    config.tiktokUser = document.getElementById("tiktok-username").value;
    alert("Configuración guardada. ¡Haz clic en ON para empezar!");
}

// Inicia/detiene la conexión
function toggleLive() {
    const btn = document.getElementById("live-btn");
    config.isLive = !config.isLive;

    if (config.isLive) {
        btn.textContent = "ON";
        btn.style.background = "green";
        startTikTokConnection();
    } else {
        btn.textContent = "OFF";
        btn.style.background = "red";
    }
}

// Conexión a TikTok (usando Cloudflare Worker)
async function startTikTokConnection() {
    const response = await fetch("https://tu-worker.tu-subdominio.workers.dev/connect", {
        method: "POST",
        body: JSON.stringify({
            tiktokUser: config.tiktokUser,
            game: config.game
        })
    });
    console.log(await response.json());
}
