const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); // <-- Node.js'in komut çalıştırma modülü

let backendProcess; // Backend sürecini burada tutacağız

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}

// Backend'i (.jar dosyasını) başlatan fonksiyon
function startBackend() {
    // Kurulum rehberimizde .jar dosyasını C:\BakkalKasa klasörüne koymuştuk.
    // Bu yolun marketçinin bilgisayarında doğru olduğundan emin olmalıyız.
    const backendJarPath = 'C:\\yazar-kasa\\admin-0.0.1-SNAPSHOT.jar'; // .jar dosyanın adını kontrol et
    
    // 'java -jar ...' komutunu çalıştır
    backendProcess = spawn('java', ['-jar', backendJarPath]);

    backendProcess.stdout.on('data', (data) => {
        console.log(`Backend Log: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
        console.error(`Backend Hata: ${data}`);
    });
}

app.whenReady().then(() => {
  startBackend(); // Pencereyi oluşturmadan önce backend'i başlat
  createWindow();
});

// Tüm pencereler kapandığında
app.on('window-all-closed', () => {
  // Backend sürecini de sonlandır
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});