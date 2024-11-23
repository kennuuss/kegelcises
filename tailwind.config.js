/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./Components/**/*.{js,ts,jsx,tsx}',
		'./Containers/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
		screens: {
			sm: '640px', // Мобильные устройства
			md: '768px', // Плашеты
			lg: '1024px', // Ноутбуки
			xl: '1280px', // Десктопы
			'2xl': '1536px', // Большие экраны
		},
	},
	plugins: [],
}
