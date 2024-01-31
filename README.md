https://ecommerce-spilus.vercel.app/

## Popis

Ukážka jednoduchého e-shopu napojeného na Payload CMS bežiaceho na MongoDB. Snažil som sa ho optimalizovať
pre čo najlepšie výsledky v PageSpeed Insights. Vytvoril som si vlastný produktový karusel, aby som
minimalizoval veľkosť JavaScriptu. Využil som najnovšie funkcie Next.js, ako je posielanie serverového
obsahu do klientského wrapperu prostredníctvom children prop. Pre detail produktu som využil princíp SSG
(Static Site Generation). Pri dizajne som postupoval "mobile-first" technikou a použil som Tailwind CSS
spolu so SCSS na štylizáciu. Pre dáta, ktoré som potreboval načítať na klientskej strane, som si vytvoril
vlastné routy, kde využívam už pripravené serverové fetches a načítavam ich za pomoci knižnice "SWR",
ktorej hlavnou výhodou je automatické cachovanie dát.


## Description

This project is a demonstration of a simple e-commerce platform connected to Payload CMS running on MongoDB. 
I have optimized it for the best possible PageSpeed Insights scores. To minimize the JavaScript footprint, 
I created a custom product carousel. I utilized the latest features of Next.js, such as sending server-side
content to a client-side wrapper through the children prop. For product details, I employed the SSG
(Static Site Generation) principle. The design follows a "mobile-first" approach, and I used Tailwind 
CSS along with SCSS for styling. For data that needed to be fetched on the client side, I created custom
routes that leverage pre-existing server-side fetches, fetching them using the "SWR" library, which 
offers automatic data caching as its main advantage