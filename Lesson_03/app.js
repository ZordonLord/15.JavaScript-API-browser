const unsplashAccessKey = 'fvHIdEHuucyk_Pme2o_ObOJ_OKFiKmrHe2T2744eGhM';
const unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`;

const imageElement = document.getElementById('unsplash-image');
const photographerNameElement = document.getElementById('photographer-name');
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('like-count');

let likeCount = 0;

async function fetchRandomImage() {
    try {
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();

        imageElement.src = data.urls.regular;
        photographerNameElement.textContent = `Фотограф: ${data.user.name}`;
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
    }
}

function likeImage() {
    likeCount++;
    likeCountElement.textContent = `Лайков: ${likeCount}`;
}

// Обработчик события для кнопки "лайк"
likeButton.addEventListener('click', likeImage);

window.onload = fetchRandomImage;