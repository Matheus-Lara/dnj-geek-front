<template>
  <div class="scanner-container">
    <h1 v-if="!isAutoStart">Leitor de QR Code</h1>
    <div v-if="!scanResult && !errorMessage && !isAutoStart" class="button-container">
      <button @click="startScanner" class="scan-button">Ler QR Code</button>
    </div>

    <div id="qr-reader"></div>

    <div v-if="errorMessage" class="error-container">
      <h3>QR Code Inválido</h3>
      <p class="error-text">{{ errorMessage }}</p>
      <button @click="resetScanner" class="scan-button">Tentar Novamente</button>
    </div>
    <div class="mt-3">
      <button @click="goToHome" class="btn btn-danger">Cancelar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Html5Qrcode } from 'html5-qrcode';

let html5QrCode: Html5Qrcode | null = null;
const scanResult = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const router = useRouter();
const route = useRoute();
const isAutoStart = ref(false);

onMounted(() => {
  isAutoStart.value = route.query.autoStart === 'true';
  if (isAutoStart.value) {
    startScanner();
  }
});

const goToHome = () => {
  router.push({ name: 'home' });
};

const startScanner = async () => {
  try {
    const qrCodeSuccessCallback = (decodedText: string) => {
      stopScanner();
      const expectedUrl = "https://deck607gm33ab.cloudfront.net";
      if (!decodedText.startsWith(expectedUrl)) {
        errorMessage.value = "Este QR Code não parece ser de um colecionável válido.";
        return;
      }

      try {
        const url = new URL(decodedText);
        const qParam = url.searchParams.get('c');
        if (!qParam) {
          errorMessage.value = "O QR Code é válido, mas não contém as informações necessárias para o resgate.";
          return;
        }
        router.push({ name: 'collectible', query: { c: qParam } });
      } catch (error) {
        errorMessage.value = "Não foi possível interpretar as informações do QR Code.";
      }
    };

    const qrCodeErrorCallback = (errorMessage: string) => {
      // Erros de "QR code not found" são normais, podemos ignorá-los
    };

    const qrReaderElement = document.getElementById('qr-reader');
    if (!qrReaderElement) {
        console.error("Elemento 'qr-reader' não encontrado.");
        return;
    }

    html5QrCode = new Html5Qrcode("qr-reader");
    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      qrCodeSuccessCallback,
      qrCodeErrorCallback
    );

  } catch (err) {
    console.error("Erro ao iniciar o scanner de QR code", err);
    errorMessage.value = "Não foi possível iniciar a câmera. Verifique as permissões no seu navegador."
  }
};

const stopScanner = () => {
  if (html5QrCode && html5QrCode.isScanning) {
    html5QrCode.stop().catch(err => {
      console.error("Erro ao parar o scanner.", err);
    });
    const qrReaderElement = document.getElementById('qr-reader');
    if(qrReaderElement) {
        qrReaderElement.innerHTML = '';
    }
  }
};

const resetScanner = () => {
    scanResult.value = null;
    errorMessage.value = null;
    const qrReaderElement = document.getElementById('qr-reader');
    if(qrReaderElement) {
        qrReaderElement.innerHTML = '';
    }
}

onUnmounted(() => {
  stopScanner();
});

</script>

<style scoped>
.scanner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

#qr-reader {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.scan-button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.scan-button:hover {
  background-color: #0056b3;
}

.result-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #28a745;
  border-radius: 8px;
  background-color: #f0fff4;
}

.result-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #155724;
  word-break: break-all;
}
.error-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #f44336;
  border-radius: 8px;
  background-color: #ffdddd;
}
.error-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #f44336;
  word-break: break-all;
}
</style>