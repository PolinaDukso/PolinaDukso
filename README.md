# Portfolio site for GitHub Pages

## Структура
- `index.html` — главная: герой, три кейса, подход, CTA
- `projects.html` — список кейсов
- `project-underwriter.html`, `project-neiromasha.html`, `project-vzr.html` — case study
- `about.html`, `contact.html`
- `assets/css/style.css`, `assets/js/main.js`, `assets/img/favicon.svg`
- `Кабинет андеррайтера/`, `НейроМаша/`, `ВЗР/` — скриншоты макетов

## Что заменить перед публикацией
1. Контакты в `contact.html` — сейчас там заглушки `your-email@example.com`, `@your_username`, `your-profile`.
2. В `project-neiromasha.html` (раздел «Решение») оставлен комментарий `TODO` — место для скриншота экрана результата распознавания.

## Как вставлять скриншоты
Скриншот кладётся в рамку `.shot` (светлая подложка `#f7f8fb`, пропорция 16:9, картинка не растягивается больше натурального размера):
```html
<div class="shot">
  <img src="НейроМаша/screen.png" alt="Что изображено на экране">
</div>
```
- `shot shot-cover` — для готовых обложек: картинка заполняет рамку целиком.
- `shot shot-natural` — для широких скриншотов внутри кейса: рамка подстраивается под высоту картинки.
- атрибут `data-zoom` на рамке — клик по скриншоту открывает его в полном размере.

Внутри кейса скриншот с подписью:
```html
<figure class="case-figure">
  <div class="shot shot-natural" data-zoom>
    <img src="Кабинет андеррайтера/3. Work Zone cropped.png" alt="Work Zone" loading="lazy">
  </div>
  <figcaption>Подпись к скриншоту</figcaption>
</figure>
```

## Как опубликовать на GitHub Pages
1. Создайте новый репозиторий на GitHub.
2. Загрузите содержимое этой папки в корень репозитория.
3. Откройте `Settings` → `Pages`.
4. В разделе `Build and deployment` выберите:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Сохраните настройки.
6. Через несколько минут GitHub Pages опубликует сайт по адресу вида:
   `https://username.github.io/repository-name/`

## Если хотите публиковать на username.github.io
Создайте репозиторий с именем:
`username.github.io`

Тогда сайт будет открываться без названия репозитория в URL.
