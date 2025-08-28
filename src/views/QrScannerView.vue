<template>
  <div class="scanner-container">
    <h1>Leitor de QR Code</h1>
    <div v-if="!scanResult" class="button-container">
      <button @click="startScanner" class="scan-button">Ler QR Code</button>
    </div>

    <div id="qr-reader"></div>

    <div v-if="scanResult" class="result-container">
      <h3>QR Code Lido com Sucesso!</h3>
      <p class="result-text">{{ scanResult }}</p>
      <button @click="resetScanner" class="scan-button">Ler Novamente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

let html5QrCode: Html5Qrcode | null = null;
const scanResult = ref<string | null>(null);

const startScanner = async () => {
  try {
    const qrCodeSuccessCallback = (decodedText: string) => {
      scanResult.value = decodedText;
      stopScanner();
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
  }
};

const stopScanner = () => {
  if (html5QrCode && html5QrCode.isScanning) {
    html5QrCode.stop().catch(err => {
      console.error("Erro ao parar o scanner.", err);
    });
  }
};

const resetScanner = () => {
    scanResult.value = null;
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
</style>