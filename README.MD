# Политех Верстальщик

Плагин для Figma, который собирает листовки.

## Что умеет

- Собирать месячную листовку, коробочную и фикс в автоматическом режиме
- Добавлять рекламные блоки
- Резсайзить изображения
- Обновлять цены
- Ставить кликабельные QR и артикулы
- Добавлять дополнительные скидки, рассчитывать если забыли указать
- Просчитывать заранее количество страниц
- Автоматически разбирать на категории
- Подсвечивать проблемы и неточности на исправление

и еще много функционала в одной кнопке "Создать"

## Установка плагина из GitHub

Сборка уже выложена в [GitHub Releases](https://github.com/Polytech-Instrument/Figma-plugins/releases/tag/stable):

1. [Скачать архив релиза](https://github.com/Polytech-Instrument/Figma-plugins/releases/tag/stable) `Лучше скачивать dist.zip, он самый актуальный или по дате (самый свежий)`
2. Распаковать его в удобную папку на компьютере
3. Внутри архива есть папка шрифты, их нужно установить в `C:\Windows\Fonts`
4. Зайти в [Figma](https://figma.com), авторизоваться и нажать + (новый дизайн файл)
![figma image](https://github.com/Polytech-Instrument/Figma-plugins/blob/main/readme_media/figma_add.jpg)
5. В [Figma](https://figma.com) открыть `Plugins` (значек плейстейшн) -> в поиске написать `manifest` 
**ВНИМАНИЕ!! должен быть установлен [клиент Figma](https://www.figma.com/download/desktop/win)**

![manifest import](https://github.com/Polytech-Instrument/Figma-plugins/blob/main/readme_media/manifest.jpg)
6. Выбрать файл `manifest.json` `<ПУТЬ_ДО_АРХИВА>/dist/manifest.json`

После этого плагин появится в локальных development plugins.

## Как пользоваться

### 1. Генерация каталога
![alt text](https://github.com/Polytech-Instrument/Figma-plugins/blob/main/readme_media/screen1.jpg)

Выбираем лист или листы, нажимаем создать.

Что делает генерация:

1. Читает `базу`
2. Читает `гугл таблицу`
3. Синхронизирует данные
4. Строит листовки, бьет товары, бьет листовки на категории и много много всего, а самое главное что в автоматическом режиме.

### 2. Обновление информации
![alt text](https://github.com/Polytech-Instrument/Figma-plugins/blob/main/readme_media/screen1.jpg)

Выбрать лист, нажать обновить.

Что обновляется:

- скидка в карточке
- цена, если в таблице есть колонка цены
- `Условия` из колонки `Условия`
- данные баннера:
  - максимальная скидка
  - месяц следующей акции
  - диапазон дат акции


### 3. Сохранение PDF 
![figma save](https://github.com/Polytech-Instrument/Figma-plugins/blob/main/readme_media/framestopdf.jpg)

- Жмем значек фигмы
- `File` -> `Save frames to pdf` -> `Save`

## Что важно для шаблона Figma

Плагин опирается на имена слоев в компонентах.
Основные имена:

- `#Title`
- `#Description`
- `#Image`
- `productDiscount`
- `#DiscountInfo`
- `saleStar`
- `#ListContainer`
- `#SKU`
- `#Specs`
- `#Min`
- `#Qty`
- `#Price`
- `itemSale`
- `priceProductDiscount`

Также используются:

- компонент карточки товара
- компонент строки товара
- компонент баннера
- компонент футера

Если переименовать эти слои в шаблоне, логика перестанет находить нужные элементы, нужно будет привязывать новые через хэши.

## При нахождении багов и неточностей связываться с разработчиком, версия стабильная, но жесткие нагрузки не до конца протестированы, в каждую следующую версию я обновляю защиты и оптимизирую код!