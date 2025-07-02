// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Развернуть приложение на весь экран
        tg.expand();
        
        // Можно использовать данные пользователя Telegram
        const user = tg.initDataUnsafe?.user;
        if (user) {
            console.log('Telegram user:', user);
        }
        
        // Настройка BackButton
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            tg.close();
        });
    }
    
    // Обработчики для копируемых элементов
    document.querySelectorAll('.clickable').forEach(element => {
        element.addEventListener('click', () => {
            const textToCopy = element.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyNotification();
                });
            }
        });
    });
    
    // Добавляем классы для анимаций при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate__fadeIn');
            }
        });
    };
    
    // Запускаем при загрузке и при прокрутке
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Добавляем эффекты нажатия для всех интерактивных элементов
    document.querySelectorAll('button, a, .clickable').forEach(element => {
        element.classList.add('tg-effects');
    });
});