---
name: ux-creative-process
description: UI/UX ve tasarım fikirleri üretmek için yaratıcı, adım adım bir süreç rehberi. Kullanıcı bir arayüz, bileşen, sayfa veya uygulama tasarlamak istediğinde ya da "nasıl görünmeli", "tasarım fikri ver", "UX öner" gibi ifadeler kullandığında bu skill'i kullan.
---

# 🎨 Yaratıcı UX Tasarım Süreci

Bu skill, her tasarım görevinde **klişelerden kaçınarak** özgün, cesur ve kullanıcı odaklı çözümler üretmek için adım adım bir yaratıcı süreç uygular.

---

## Süreç: 5 Aşama

### AŞAMA 1 — Bağlamı Çöz ("Who & Why")

Tasarıma başlamadan önce şu soruları yanıtla:

- **Kim kullanacak?** (yaş, teknik seviye, motivasyon, bağlam)
- **Ne hissettirmeli?** (güven, heyecan, huzur, aciliyet, oyun?)
- **Hangi ortamda?** (mobil-first, masaüstü, dokunmatik, dark ortam?)
- **Rakip/ilham?** (ne yapılmış, ne YAPılmamalı?)

> Eğer bu bilgiler yoksa, kullanıcıya 1–2 net soru sor. Asla varsayımla geçme.

---

### AŞAMA 2 — Konsept Patlaması ("Crazy 8s")

En az **3 farklı konsept yönü** öner. Her biri farklı bir tasarım felsefesini temsil etmeli:

| # | Konsept Adı | Estetik Yön | Temel Duygu | Risk Seviyesi |
|---|-------------|-------------|-------------|---------------|
| 1 | ... | örn. Minimalist / Zen | örn. Güven | Düşük |
| 2 | ... | örn. Brutalist / Ham | örn. Güç | Orta |
| 3 | ... | örn. Organik / Akışkan | örn. Keşif | Yüksek |

Konsept başlıkları şunlardan ilham alabilir ama özgün olmalı:
- Minimalist · Brutalist · Editorial · Retro-Futuristik · Organik · Luxury · Oyunsu · Endüstriyel · Art Deco · Cyberpunk · Wabi-Sabi

**Kural:** Hiçbir konsept "standart SaaS tasarımı" olmamalı. Her biri belirgin bir karakter taşımalı.

---

### AŞAMA 3 — Tasarım Kararları ("The Brief")

Seçilen konsept için şu kararları somutlaştır:

#### 🎨 Renk Paleti
- Ana renk (dominant)
- Vurgu rengi (keskin, az kullanılacak)
- Arka plan ve yüzey renkleri
- Metin rengi hiyerarşisi

*Mor gradyan üzerine beyaz metin gibi klişelerden kaçın. Beklenmedik renk çiftleri dene.*

#### 🔤 Tipografi
- Display/başlık fontu (karakter taşıyan, özgün)
- Body fontu (okunabilir, display'i dengeleyen)
- Boyut hiyerarşisi (H1 → body → caption)

*Inter, Roboto, Arial gibi jenerik fontlardan kaçın. Google Fonts'tan cesur seçimler yap.*

#### 📐 Layout & Kompozisyon
- Grid yapısı (12-col? Asimetrik? Serbest?)
- Boşluk felsefesi (geniş nefes mi? Yoğun info-density mi?)
- Kırılma noktaları (grid'i kıran elementler, çakışmalar)

#### ✨ Hareket & Mikro-etkileşim
- Sayfa yükleme animasyonu
- Hover/focus durumları
- Geçiş efektleri
- Scroll tetikleyiciler

#### 🌍 Atmosfer
- Texture, noise, grain, gradient mesh?
- Gölge felsefesi (sert mi, yumuşak mı, hiç yok mu?)
- Dekoratif elementler (geometrik şekiller, çizgiler, ikonografi stili)

---

### AŞAMA 4 — Bileşen Haritası ("Component Map")

Tasarlanacak arayüzün temel bileşenlerini listele:

```
[ ] Navigation / Header
[ ] Hero / Landing bölümü
[ ] Kart bileşenleri
[ ] Form elemanları (input, button, select)
[ ] Boş durum (empty state)
[ ] Yükleme durumu (loading state)
[ ] Hata durumu (error state)
[ ] Modal / Drawer
[ ] Footer
```

Her bileşen için **seçilen konseptin** nasıl yansıtılacağını 1 cümleyle açıkla.

---

### AŞAMA 5 — Uygulama & Teslimat

Aşağıdaki formatlardan uygun olanı üret:

- **Kod** → HTML/CSS/JS veya React bileşeni (tam çalışır, production-grade)
- **Wireframe** → ASCII veya Mermaid diagram ile yapısal iskelet
- **Spec Dokümanı** → Tasarımcıya/geliştiriciye handoff belgesi
- **Prototip Açıklaması** → Kullanıcı akışlarını anlatan metin

---

## Yaratıcılık Kuralları

Bu skill'i kullanırken şu kurallara uy:

1. **Klişe yasak** — "Mavi buton, beyaz arka plan, Inter font" kombinasyonu asla kabul edilemez.
2. **Bir konsept seç, tam uygula** — Yarım kalmış çok konsept yerine tek cesur yön daha iyidir.
3. **Kullanıcıyı unutma** — Ne kadar yaratıcı olursa olsun, arayüz kullanılabilir olmalı.
4. **Detay şeytandadır** — Hover rengi, border-radius farkı, font weight seçimi — bunlar tasarımı öldürür ya da canlandırır.
5. **Her tasarım farklı olmalı** — Aynı yaklaşımı iki projede tekrarlama.

---

## Referans Dosyalar

- `references/color-theory.md` — Renk paleti oluşturma rehberi
- `references/typography-pairs.md` — Önerilen font kombinasyonları
- `examples/dark-brutalist.md` — Dark + Brutalist konsept örneği
- `examples/organic-pastel.md` — Organik + Pastel konsept örneği
