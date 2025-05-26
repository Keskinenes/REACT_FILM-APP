# 🎬 Film App

Film App, TMDB API kullanarak geliştirilen, kullanıcıların film arayabildiği, detaylarını görebildiği ve favorilerine ekleyebildiği bir React uygulamasıdır. Firebase ile kullanıcı girişi sağlanmıştır.

## 🚀 Özellikler

- 🔍 Film arama (Search bar üzerinden)
- 🌟 Favorilere film ekleme / çıkarma
- 👤 Firebase Authentication ile kullanıcı girişi ve çıkışı
- 💾 Gerçek zamanlı favori filmleri dinleme
- 📄 Film detay sayfası
- 🔒 Giriş yapılmadan favori eklenemez (ProtectedRoute)
- ⚡ Modern UI (Tailwind CSS)

## 🛠️ Kullanılan Teknolojiler

- React
- React Router DOM
- Firebase (Auth + Realtime Database)
- Tailwind CSS
- TMDB API
- react-icons
- react-firebase-hooks

## 🖼️ Ekran Görüntüleri

### Anasayfa
![Anasayfa](public/screenshots/homepage.png)

### Giriş Sayfası
![Giriş](public/screenshots/login.png)

### Kayıt Sayfası
![Kayıt](public/screenshots/register.png)

### Favoriler Sayfası
![Favoriler](public/screenshots/favorites.png)

### Detay Sayfası
![Detay](public/screenshots/detail.png)

### Arama Sonucu
![Arama](public/screenshots/search.png)

## 🔐 Giriş Gerektiren Sayfalar

- `/favorites`: Favori filmlerinizi görüntülemek için giriş yapılması gerekir.
- Favori butonu sadece giriş yapılmışsa çalışır. Aksi halde uyarı verir.

## 🔧 Kurulum

1. Bu projeyi klonla:
```bash
git clone https://github.com/kullaniciadi/film-app.git
cd film-app
