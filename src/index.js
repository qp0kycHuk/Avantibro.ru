import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import rangeSlider from './js/range-slider';
import theme from './js/theme';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import inputmask from "./js/inputmask";
import ymaps from 'ymaps';


import 'npm-kit-ripple/index.css';
import 'swiper/css';
import './ui/ui-reset.scss'
import './ui/ui-core.scss'
import './ui/ui-example.scss'
import './scss/frontend--fonts.scss'
import './scss/frontend--style.scss'

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
	fancybox.init();
	showPass.init();
	rangeSlider.init()
	tab.init();
	toggle.init();
	ripple.init();
	theme.init();
	inputmask.init(document)

	ripple.attach('.btn')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')

	document.addEventListener('click', clickHandler);

	window.addEventListener('scroll', mapsInit)
	document.addEventListener('click', mapsInit)
	setTimeout(mapsInit, 5000)
}

window.addEventListener('toggleopen', (event) => {
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.add('menu-open')
	}

})

window.addEventListener('toggleclose', (event) => {
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.remove('menu-open')
	}

})

function clickHandler(event) {
	function scrollTo() {
		const target = event.target.closest('[data-scroll]');
		const href = target.getAttribute('data-scroll');

		if (!href) return;
		if (href[0] != '#' || href == '#') return;

		event.preventDefault();

		var element = document.querySelector(href);
		const offset = 45;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = element.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
	if (event.target.closest('[data-scroll]')) scrollTo();



}


let mapInited = false;

function mapsInit() {
	if (mapInited) return;
	mapInited = true

	ymaps
		.load()
		.then(maps => {

			const map = new maps.Map('map', {
				center: [45.043069, 38.948660],
				zoom: 12

			})

			const placemark = new maps.Placemark([45.043069, 38.948660], {}, {

				iconLayout: 'default#image',
				iconImageHref: '../img/geo.png',
				iconImageSize: [54, 60],
				iconImageOffset: [-27, -60]

			})


			map.controls.remove('geolocationControl')
			map.controls.remove('searchControl')
			map.controls.remove('trafficControl')
			map.controls.remove('typeSelector')
			map.controls.remove('fullscreenControl')
			// map.controls.remove('zoomControl')
			map.controls.remove('rulerControl')
			map.behaviors.disable(['scrollZoom'])
			map.geoObjects.add(placemark)
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));
}