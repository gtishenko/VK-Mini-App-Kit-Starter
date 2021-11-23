# VK Mini App Kit Starter

Стартовый кит для создания сервиса на платформе VK Mini Apps.

Доработка [vk-mini-app-boilerplate](https://github.com/iSa1vatore/vk-mini-app-boilerplate)

## Установка
`git clone https://github.com/gtishenko/VK-Mini-App-Kit-Starter.git <folder name>`

Перейдите в созданную папку и выполните команды: npm i и npm start, последняя запустит сервер для разработки на http://localhost:10888

## Что переработано?
- проект переписан на [React Hooks](https://ru.reactjs.org/docs/hooks-intro.html)
- проект переписан на [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- исправлено сохранение скролла при переходе по вкладкам
- исправлено изменение цветовой схемы
- на [vk.com](https://vk.com) теперь используется боковой вид меню — [SplitLayout](https://vkcom.github.io/VKUI/#/SplitLayout)
- проект обновлён до последней версии VKUI
- отказ от использования VK Connect в пользу VK Bridge

## KIT:
### Что реализовано:
- Поддержка темы нативного клиента
- Поддержка iOS swipe back для панелей
- Обработка хардверной кнопки "назад" для Android
- Сохранение позиции скролла для панелей и элементов
- Scroll To Top при нажатии на иконку в Epic`e
- Роутер

### Роутер:
Действия которые роутер может выполнить:

- setStory(story, initial_panel) - Устанавливает активную Story у Epic'a, View и активную панель.
- setPage(view, panel) - Устанавливает активный View и Panel
- goBack(from) - Совершает действие назад, будь то закрытие модального окна, переход на прошлую панель, закрытие попапа и т.п;
- openPopout(popout) - Открывает popup.
- closePopout() - Закрывает popup.
- openModal(id) - Открывает модальную страницу по её ID.
- closeModal() - Закрывает модальную страницу или открывает прошлую страницу.

### Сохранение позиции скролла:
Для сохранения позиции горизонтального скоролла нужно:

- Указать ID для элемента HorizontalScroll
```javascript
<HorizontalScroll id="EXAMPLE_TABS_LIST">
...
</HorizontalScroll>
```

- Сохранить позицию при демонтировании

- Восстановить позицию при монтировании
```javascript
useEffect(() => {
    restoreScrollPosition();
	
	return () => {
		const {setScrollPositionByID} = this.props;

    	setScrollPositionByID("EXAMPLE_TABS_LIST");
	  }
  });
```

Демо: https://vk.com/app8001816 <br />
Мой VK: https://vk.com/gtishenko