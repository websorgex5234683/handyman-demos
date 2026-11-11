# Демо-сайты для местных бизнесов (США)

Бесплатные демо для холодных писем. Все страницы закрыты от Google (noindex).

## Ниши

| Папка | Что там | Ссылка |
|---|---|---|
| `clients/` | Хэндимены: 1 страница (`index.html` + `config.js`) | `https://websorgex5234683.github.io/handyman-demos/clients/<папка>/` |
| `roofing/_template/` | Кровельщики: шаблон из 3 страниц | `https://websorgex5234683.github.io/handyman-demos/roofing/_template/` |

## Шаблон кровельщиков

- `index.html` — главная, `work.html` — работы (фото до/после), `inspection.html` — заявка на осмотр и контакты
- `config.js` — анкета клиента. Меняется только этот файл. Пустое поле — блок скрыт.
- `styles.css`, `site.js` — дизайн и движок, не трогать.
- `images/` — фото клиента.

Подробная инструкция на русском лежит на рабочем столе: «Сайты кровельщиков/_template/КАК ПОЛЬЗОВАТЬСЯ.txt»
(в репозиторий не выкладывается, чтобы её нельзя было открыть по ссылке).

## Оплаченный сайт

1. `config.js`: `demo: false`
2. Удалить строку `<meta name="robots" content="noindex, nofollow">` во всех .html
3. Публикация на Cloudflare Pages, форма через Formspree (`form.endpoint`).
