// Cole suas chaves aqui!
const firebaseConfig = {
  apiKey: "AIzaSyDz5FUlrXC07aQDMJ4XzomdT4gkyKZVKgg",
  authDomain: "arboriza-bd.firebaseapp.com",
  databaseURL: "https://arboriza-bd-default-rtdb.firebaseio.com",
  projectId: "arboriza-bd",
  storageBucket: "arboriza-bd.firebasestorage.app",
  messagingSenderId: "210425976523",
  appId: "1:210425976523:web:2733f5b67fe02aa7d4ad4e"
};
const PLANTNET_API_KEY = "2b10KirnY9xXntdHVSrcKlHDje";

// Inicialização
if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Renderiza ícones em todas as páginas

    // --- LÓGICA DO MAPA (mapa.html com Leaflet.js) ---
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        // Verifica se o navegador suporta geolocalização
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                
                // 1. Inicializa o mapa e centra na localização do usuário
                const map = L.map('map-container').setView(userLocation, 16); // Zoom 16 para mais detalhe

                // 2. Adiciona a camada de mapa do OpenStreetMap (o visual do mapa)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // 3. Adiciona um marcador (pin) na localização do usuário
                L.marker(userLocation).addTo(map)
                    .bindPopup('<b>Você está aqui!</b>')
                    .openPopup();

                // 4. (FUTURO) Carregar e adicionar os pins das árvores do Firebase
                // Exemplo de como adicionar um pin de árvore:
                // const treeLocation = [-22.9068, -43.1729]; // Coordenadas de uma árvore
                // L.marker(treeLocation).addTo(map).bindPopup("Ipê Amarelo");
                
            }, () => {
                // O que fazer se o usuário negar a localização
                mapContainer.innerHTML = '<p class="text-center p-4">Não foi possível obter sua localização. Por favor, habilite nas configurações do seu navegador.</p>';
            });
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
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