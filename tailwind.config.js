/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./Components/**/*.{js,ts,jsx,tsx}',
		'./Containers/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			/* animation: {
				pulse: 'pulseSize 1s ease-in-out infinite',
			},
			keyframes: {
				pulse: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
				},
			}, */
		},
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
