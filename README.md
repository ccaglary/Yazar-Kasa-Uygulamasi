# Market POS & Yönetim Uygulaması

Bu proje, küçük ve orta ölçekli marketler için geliştirilmiş bir Yazar Kasa (POS) ve Ürün Yönetim sistemidir. React (Vite) + Electron ile masaüstü uygulaması olarak çalışır, backend ise Spring Boot ve PostgreSQL ile sağlanır.

# Market POS & Yönetim Uygulaması

Bu proje, küçük ve orta ölçekli marketler için geliştirilmiş bir Yazar Kasa (POS) ve Ürün Yönetim sistemidir. React (Vite) + Electron ile masaüstü uygulaması olarak çalışır, backend ise Spring Boot ve PostgreSQL ile sağlanır.

## Özellikler
- Ürün ekleme, düzenleme, silme (Admin paneli)
- Kategori yönetimi (örn. Cips, Sigara, Dondurma, vb.)
- Barkod ile ürün arama ve hızlı satış
- Kilogram ve adet bazlı satış desteği
- Satış işlemlerinin kaydı
- PostgreSQL veritabanı ile tam entegre
- Modern ve kullanıcı dostu arayüz

## Kurulum
### 1. Backend (Spring Boot)
1. `admin/application.properties` dosyasında PostgreSQL bağlantı bilgilerinizi kontrol edin:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=123456
   ```
2. Proje kökünde terminal açın:
   ```sh
   cd admin
   ./mvnw spring-boot:run
   ```

### 2. Frontend (React + Electron)
1. Gerekli paketleri yükleyin:
   ```sh
   cd market-fronted
   npm install
   ```
2. Geliştirme modunda başlatmak için:
   ```sh
   npm run dev
   ```
3. Masaüstü uygulaması olarak başlatmak için:
   ```sh
   npm run electron:start
   ```
4. .exe olarak paketlemek için:
   ```sh
   npm run electron:build
   ```

## Ekran Görüntüleri
- Admin Paneli
- Satış Ekranı

## Katkı ve Lisans
Kendi marketinize göre özelleştirebilir, katkıda bulunabilirsiniz.

