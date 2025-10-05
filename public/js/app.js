// public/js/app.js

// SUAS CHAVES DE API - PREENCHA AQUI!
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

// INICIALIZAÇÃO (só se as chaves existirem)
if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}

// Roda sempre que uma página é carregada
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Renderiza todos os ícones

    // --- LÓGICA DA TELA DE CÂMERA (camera.html) ---
    const plantPhotoInput = document.getElementById('plant-photo-input');
    const plantPhotoPreview = document.getElementById('plant-photo-preview');
    const plantPhotoPlaceholder = document.getElementById('plant-photo-placeholder');
    const btnIdentify = document.getElementById('btn-identify-plant');

    if (plantPhotoInput) {
        // Quando o usuário escolhe um arquivo da galeria
        plantPhotoInput.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    plantPhotoPreview.src = e.target.result;
                    plantPhotoPlaceholder.classList.add('hidden');
                    plantPhotoPreview.classList.remove('hidden');
                    btnIdentify.classList.remove('hidden');
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });

        // Quando o usuário clica em IDENTIFICAR (ainda simulado, mas pronto para a API)
        btnIdentify.addEventListener('click', () => {
            // AQUI ENTRARÁ A LÓGICA DA PLANTNET
            alert("Lógica da PlantNet a ser implementada aqui!");
            // Ex: showResultScreen(resultadoDaApi);
        });
    }


    // --- LÓGICA DA TELA DE CONQUISTAS (conquistas.html) ---
    const btnGenerateMission = document.getElementById('btn-generate-mission');
    if (btnGenerateMission) {
        btnGenerateMission.addEventListener('click', async () => {
            const missionText = document.getElementById('ai-mission-text');
            missionText.textContent = 'Consultando Arvoreco para uma nova missão...';
            btnGenerateMission.disabled = true;

            // Simulação de chamada de IA
            setTimeout(() => {
                const missions = [
                    "Fotografe a flor de uma árvore frutífera no seu bairro.",
                    "Encontre uma árvore com mais de 10 metros de altura e registre-a.",
                    "Limpe a área ao redor de uma árvore em sua rua e poste no feed.",
                    "Verifique a saúde de uma árvore que parece doente e adicione um cuidado."
                ];
                const randomMission = missions[Math.floor(Math.random() * missions.length)];
                missionText.textContent = randomMission;
                showToast("Nova missão gerada com sucesso!");
                btnGenerateMission.disabled = false;
            }, 2000);
        });
    }

    // --- LÓGICA GERAL ---

    // Função para mostrar notificações (Toast)
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-5 rounded-full shadow-lg fade-in z-50';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };
});