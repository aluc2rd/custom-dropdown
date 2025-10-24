//полифил для forEach
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
	//поиск в локальной обертке
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
	const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

	//открыть или закрыть
	dropDownBtn.addEventListener('click', function () {
		dropDownList.classList.toggle('dropdown__list--visible');
		this.classList.toggle('dropdown__button--active');
	});

	//выбор элемента из списка, запомнить выбранное, закрыть дропдаун
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (event) {
			event.stopPropagation(); //остановка передачи события наверх
			dropDownBtn.innerText = this.innerText;
			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;
			//скрытие
			dropDownList.classList.remove('dropdown__list--visible');
		});
	});

	//клик снаружи
	document.addEventListener('click', function (event) {
		if (event.target !== dropDownBtn) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});

	//нажатие на tab или escape
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Tab' || event.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const generateBtn = document.getElementById('generatePlaylist');
	const resultBlock = document.getElementById('resultBlock');
	const playlistPreview = document.getElementById('playlistPreview');

	// Объект с плейлистами для разных комбинаций
	const playlists = {
		'lofi-focus-night': [
			'♫ Lofi Coding Session - Chillhop Music',
			'♫ Midnight Study - College Music',
			'♫ Coffee & Rain - Lofi Beats',
			'♫ Deep Focus - Jazz Lofi',
		],
		'electronic-energy-day': [
			'♫ Energy Boost - Electronic Hits',
			'♫ Workout Motivation - EDM Mix',
			'♫ Productivity Flow - Deep House',
			'♫ Focus Drive - Techno Vibes',
		],
		'jazz-relax-evening': ['♫ Smooth Jazz Evening', '♫ Coffee Shop Ambience', '♫ Late Night Jazz Session', '♫ Relaxing Piano & Sax'],
		// Можно добавить больше комбинаций
	};

	generateBtn.addEventListener('click', function () {
		// Получаем выбранные значения
		const genre = document.querySelector('input[name="music-genre"]').value;
		const mood = document.querySelector('input[name="music-mood"]').value;
		const time = document.querySelector('input[name="music-time"]').value;

		if (!genre || !mood || !time) {
			alert('🎵 Пожалуйста, заполните все поля для генерации плейлиста!');
			return;
		}

		// Генерирация ключа для поиска плейлиста
		const playlistKey = `${genre}-${mood}-${time}`;

		// Получение плейлиста или использование дефолтного
		const selectedPlaylist = playlists[playlistKey] || [
			'♫ Universal Vibes - Mixed Genres',
			'♫ Your Personal Mix - Algorithm Selection',
			'♫ Mood Based Recommendations',
			'♫ Discover Weekly Picks',
		];

		// Отображение
		playlistPreview.innerHTML = selectedPlaylist.map((track) => `<div class="track-item">${track}</div>`).join('');

		// Блок результата
		resultBlock.style.display = 'block';

		// Плавная прокрутка к результату
		resultBlock.scrollIntoView({ behavior: 'smooth' });
	});
});

// Стили для треков в плейлисте
const trackStyles = `
.track-item {
    padding: 10px 15px;
    margin: 8px 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    border-left: 3px solid #667eea;
    transition: all 0.2s ease;
}

.track-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}
`;

// Добавление стилей в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = trackStyles;
document.head.appendChild(styleSheet);
