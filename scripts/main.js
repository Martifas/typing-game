document.addEventListener('DOMContentLoaded', () => {
    fetch('https://random-word-form.herokuapp.com/random/noun/?count=30')
        .then(response => response.json())
        .then(words => {
            const textContainer = document.querySelector('.text-container');
            textContainer.innerHTML = words.join(' ');
        })
        .catch(error => console.error('Error fetching words:', error));
});