addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method === "POST") {
        const data = await request.json();
        // Aquí iría la conexión real a TikTok LIVE
        return new Response(JSON.stringify({ status: "Conectado a @" + data.tiktokUser }));
    }
    return new Response("Hola desde el backend");
}
