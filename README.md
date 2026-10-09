# Fırsat Radarı – Ücretsiz Haftalık Tarama

1. github.com'da ücretsiz hesap aç, **Public** yeni repo oluştur (ör. `firsat-radari-tarama`).
2. Bu klasördeki tüm dosyaları (`tara.js`, `README.md`, `.github/workflows/tara.yml`) repoya yükle ("Add file > Upload files"; `.github` klasörünü de sürükle).
3. Repo > Actions sekmesi > "Haftalik tarama" > **Run workflow** ile bir kez elle çalıştır.
4. Her Pazartesi otomatik çalışır; yeni adaylar `adaylar.json` dosyasına yazılır ve e-posta ile Issue gelir. Maliyet: 0 (public repo'da Actions ücretsiz).
5. Repo adresini Claude'a ver; Claude ayda bir bu adayları doğrulayıp radar sayfasını günceller.
