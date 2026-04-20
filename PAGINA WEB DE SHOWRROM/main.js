viewer.on('viewchange', () => {
    // 1. Lógica que ya tenías para mover flechas...
    if (movingHsId) {
        let conn = connections.find(c => c.id === movingHsId);
        if (conn) {
            conn.yaw = viewer.getYaw();
            conn.pitch = viewer.getPitch();
            viewer.removeHotSpot(movingHsId, currentSceneId);
            viewer.addHotSpot({
                "id": conn.id, "pitch": conn.pitch, "yaw": conn.yaw,
                "type": "scene", "sceneId": conn.to, "cssClass": "flecha-nav editing"
            }, currentSceneId);
        }
    }

    // 2. NUEVA LÓGICA: Rotar el cono del mapa
    let activePin = document.getElementById('pin-' + currentSceneId);
    if (activePin) {
        let currentYaw = viewer.getYaw();
        // Aplicamos la rotación. Pannellum usa 0 para el frente.
        // Si tu plano está orientado al norte, esto funcionará directo.
        activePin.style.transform = `translate(-50%, -50%) rotate(${currentYaw}deg)`;
    }
});