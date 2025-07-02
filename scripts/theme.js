// Инициализация темы
function initTheme() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Проверяем тему Telegram WebApp
        const tgTheme = window.Telegram?.WebApp?.colorScheme || 'dark';
        document.documentElement.setAttribute('data-theme', tgTheme);
        localStorage.setItem('appTheme', tgTheme);
    }
}

// Переключение темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('appTheme', newTheme);
    
    // Анимация переключения
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Обработчик для кнопки переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Добавляем класс для плавного перехода темы
const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
    .language-change * {
        transition: opacity 0.3s ease !important;
    }
`;
document.head.appendChild(style);