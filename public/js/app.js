// Cole suas chaves aqui!
const firebaseConfig = {
    // COLE SUAS CREDENCIAIS DO FIREBASE AQUI
};
const PLANTNET_API_KEY = "SUA_CHAVE_PLANTNET_AQUI";
const GOOGLE_MAPS_API_KEY = "SUA_CHAVE_GOOGLE_MAPS_AQUI";

// Inicialização
if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Renderiza ícones em todas as páginas

    // --- LÓGICA DO MAPA (mapa.html) ---
    if (document.getElementById('map-container')) {
        // Esta função será chamada quando a API do Google Maps carregar
        window.initMap = () => {
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                const map = new google.maps.Map(document.getElementById("map-container"), {
                    center: userLocation,
                    zoom: 15,
                    disableDefaultUI: true,
                });
                // Adicionar marcador da localização do usuário
                new google.maps.Marker({ position: userLocation, map: map, title: "Você está aqui" });
                // AQUI VAI A LÓGICA PARA CARREGAR OS PINS DO FIREBASE E MOSTRAR NO MAPA
            }, () => {
                alert("Não foi possível obter sua localização. Verifique as permissões.");
            });
        };
    }

    // --- LÓGICA DA CÂMERA (camera.html) ---
    const plantPhotoInput = document.getElementById('plant-photo-input');
    const plantPhotoPreview = document.getElementById('plant-photo-preview');
    const plantPhotoPlaceholder = document.getElementById('plant-photo-placeholder');
    const btnIdentify = document.getElementById('btn-identify-plant');

    if (plantPhotoInput) {
        plantPhotoInput.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Salva a imagem no localStorage para usar na próxima tela
                    localStorage.setItem('plantImage', e.target.result); 
                    plantPhotoPreview.src = e.target.result;
                    plantPhotoPlaceholder.classList.add('hidden');
                    plantPhotoPreview.classList.remove('hidden');
                    btnIdentify.classList.remove('hidden');
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
        btnIdentify.addEventListener('click', () => {
            // AQUI IRÁ A CHAMADA REAL PARA A API PLANTNET
            // Por enquanto, apenas redireciona para a tela de resultado
            window.location.href = 'resultado.html';
        });
    }
    
    // --- LÓGICA DA TELA DE RESULTADO (resultado.html) ---
    const resultImage = document.getElementById('result-image');
    if (resultImage) {
        const savedImage = localStorage.getItem('plantImage');
        if (savedImage) {
            resultImage.src = savedImage;
        }
    }

    // --- LÓGICA DE CONQUISTAS (conquistas.html) ---
    const btnGenerateMission = document.getElementById('btn-generate-mission');
    if (btnGenerateMission) {
        btnGenerateMission.addEventListener('click', () => {
            const missionText = document.getElementById('ai-mission-text');
            missionText.textContent = 'Consultando Arvoreco para uma nova missão...';
            btnGenerateMission.disabled = true;
            setTimeout(() => {
                missionText.textContent = "Fotografe a flor de uma árvore frutífera no seu bairro.";
                btnGenerateMission.disabled = false;
            }, 1500);
        });
    }
});
