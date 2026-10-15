# Ağıllı Ferma Akademiyası

Elektrik avtomatikası üzrə Azərbaycan dilində tədris saytı (React + Vite). Backend yoxdur; irəliləyiş brauzerin `localStorage`-ında saxlanılır. Saytda sxem qurucusu və ya simulyator **yoxdur** — sxemlər CADe_SIMU-da qurulur.

## Yerli işə salma
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ qovluğu yaranır
```
Node.js 18+ lazımdır.

## GitHub-a yükləmə
```bash
git init && git add . && git commit -m "İlk versiya"
git branch -M main
git remote add origin https://github.com/ADINIZ/agilli-ferma-akademiyasi.git
git push -u origin main
```

## Vercel-də yayımlama
1. vercel.com → **Add New → Project** → GitHub repozitoriyasını seçin.
2. Framework: **Vite** (avtomatik tanınır). Build: `npm run build`, Output: `dist`.
3. **Deploy** basın. Hər `git push` yeni versiyanı avtomatik yayımlayır.

## Yeni dərs əlavə etmək
`src/data.js` faylında `projects` massivinə yeni obyekt əlavə edin (`full: true` olan layihələr tam dərs səhifəsi göstərir).
Sxem şəkilləri: `src/Circuit1.jsx` nümunəsinə bax və ya `public/img/` qovluğuna şəkil qoyub `<img>` ilə istifadə edin.
