# 🎡 Şans Çarkı

Modern ve etkileşimli bir şans çarkı uygulaması. Kullanıcılar kendi seçeneklerini ekleyebilir ve çarkı çevirerek rastgele bir kazanan belirleyebilir.

![Şans Çarkı](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Özellikler

### 🎨 Görsel Özellikler
- **Modern Tasarım**: Yan yana panel düzeni ile kullanıcı dostu arayüz
- **Renkli Çark**: Her seçenek farklı renklerle vurgulanır
- **Animasyonlu Çentik**: Kazananı gösteren parlayan kırmızı işaretçi
- **Responsive**: Mobil, tablet ve masaüstü uyumlu

### 🌓 Tema Sistemi
- **Light Tema**: Aydınlık ve temiz görünüm
- **Dark Tema**: Gözü yormayan karanlık mod
- **Tema Hafızası**: Seçtiğiniz tema kaydedilir

### ⚙️ Fonksiyonel Özellikler
- **Tek/Toplu Seçenek Ekleme**: İstediğiniz kadar seçenek ekleyin
- **Düzenleme**: Eklenen seçenekleri kolayca silebilirsiniz
- **Gerçekçi Dönüş**: 5-10 tur arası rastgele animasyonlu dönüş
- **Doğru Kazanan Belirleme**: Çentik tam olarak kazananı gösterir
- **Tekrar Çevirme**: Aynı seçeneklerle tekrar çark çevirebilirsiniz

## 🚀 Kullanım

### Kurulum
1. Repoyu klonlayın veya indirin:
```bash
git clone https://github.com/Resfiu/sans-carki.git
```

2. `index.html` dosyasını bir tarayıcıda açın:
```bash
# Doğrudan dosyayı açın veya
open index.html
# ya da
start index.html
```

### Nasıl Kullanılır?

1. **Seçenek Ekleme**
   - Sol paneldeki input alanına seçeneğinizi yazın
   - "Ekle" butonuna basın veya Enter tuşuna basın
   - Minimum 2 seçenek eklenmelidir

2. **Toplu Seçenek Ekleme**
   - "Toplu Seçenek Gir" toggle'ını açın
   - Her satıra bir seçenek yazın
   - "Ekle" butonuna basın

3. **Çarkı Çevirme**
   - Çarkın ortasındaki ▶ butonuna basın
   - Çark rastgele dönsün
   - Çark durduğunda sağdaki ◀ işaretçinin gösterdiği seçenek kazanır

4. **Tema Değiştirme**
   - Sağ üst köşedeki ☀️/🌙 butonuna basın
   - Tema tercihleriniz otomatik kaydedilir

## 📁 Dosya Yapısı

```
sans-carki/
│
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası (tema sistemi dahil)
├── script.js           # JavaScript mantık dosyası
└── README.md           # Bu dosya
```

## 🛠️ Teknolojiler

- **HTML5**: Semantik yapı
- **CSS3**: Modern tasarım, animasyonlar, CSS Variables (tema sistemi)
- **Vanilla JavaScript**: Canvas API ile çark çizimi, animasyonlar
- **LocalStorage**: Tema tercihini kaydetme

## 🎯 Özellik Detayları

### Çark Çizimi
- Canvas API kullanılarak dinamik olarak çizilir
- Her seçenek eşit dilime sahiptir
- 16 farklı renkten oluşan palet
- Beyaz kenarlıklar ile net ayrım

### Animasyon Sistemi
- **Ease-out** fonksiyonu ile yumuşak duruş
- 4 saniye animasyon süresi
- Rastgele dönüş mesafesi (5-10 tur + rastgele derece)
- Çentik nabız animasyonu

### Kazanan Hesaplama
- Çark durduğunda çentiğin pozisyonu hesaplanır
- Doğru dilim matematiksel olarak belirlenir
- Modal pencerede kazanan gösterilir

## 🌟 Gelecek Geliştirmeler

- [ ] Ses efektleri
- [ ] Özel renk seçimi
- [ ] Çark hızı ayarları
- [ ] Kazananlar geçmişi
- [ ] Çark tasarımı şablonları
- [ ] PDF/Resim olarak dışa aktarma
- [ ] Paylaşım özellikleri

## 👨‍💻 Geliştirici

Sorularınız veya önerileriniz için issue açabilirsiniz.

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📸 Ekran Görüntüleri

### Light Tema
Modern ve temiz arayüz ile seçeneklerinizi yönetin.

### Dark Tema
Gözü yormayan karanlık mod ile rahat kullanım.

### Çark Animasyonu
Gerçekçi dönüş animasyonu ve kazanan belirleme.

---

⭐ Beğendiyseniz yıldız vermeyi unutmayın!

