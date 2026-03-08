# Portfolio site for GitHub Pages

## Структура
- index.html
- projects.html
- about.html
- contact.html
- project-neiromasha.html
- assets/css/style.css
- assets/js/main.js
- assets/img/

## Что заменить перед публикацией
1. Контакты в `contact.html`
2. Плейсхолдеры изображений на реальные скриншоты проекта
3. При желании — тексты на главной и в About

## Куда вставлять изображения
Создайте файлы в папках:
- `assets/img/projects/neiromasha/cover.jpg`
- `assets/img/projects/neiromasha/card-cover.jpg`
- `assets/img/projects/neiromasha/hero.jpg`
- `assets/img/projects/neiromasha/result-screen.jpg`

После этого замените блоки с классом `placeholder-media` на обычные теги img.

Пример:
```html
<div class="project-media">
  <img src="assets/img/projects/neiromasha/hero.jpg" alt="НейроМаша — экран распознавания описи имущества">
</div>
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
