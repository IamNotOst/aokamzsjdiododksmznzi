// Все тексты приложения
const translations = {
    ru: {
        appTitle: "Blockman Go Ost",
        ownerTitle: "IamNotOst",
        ownerSubtitle: "Официальный русскоязычный помощник разработчиков игры Blockman Go",
        accountsTitle: "Официальные аккаунты Telegram",
        account1: "@OfficialOst - основной аккаунт для общения",
        account2: "@IamNotOst - рабочий аккаунт для официальных чатов",
        languagesTitle: "Говорю на нескольких языках",
        lang1: "Русский - отлично",
        lang2: "Английский - отлично",
        lang3: "Украинский - хорошо",
        lang4: "Китайский - изучаю",
        additionalInfoTitle: "Дополнительная информация",
        bgId1: "BG ID 1: 1220407424",
        bgId2: "BG ID 2: 350000",
        bgClan: "BG Clan: BedWar [Elder]",
        age: "Возраст: 16 лет",
        location: "Живу: Рязань (Россия)",
        supportNotice: "Все вопросы касаемо игры решаем только в соответствующих официальных чатах. Индивидуально в личных сообщениях не помогаю.",
        supportLink: "Чат поддержки игры",
        footerText: "© 2023 Blockman Go Ost. Все права защищены.",
        copied: "Скопировано в буфер обмена!"
    },
    en: {
        appTitle: "Blockman Go Ost",
        ownerTitle: "IamNotOst",
        ownerSubtitle: "Official Russian-speaking assistant for Blockman Go developers",
        accountsTitle: "Official Telegram accounts",
        account1: "@OfficialOst - main account for communication",
        account2: "@IamNotOst - work account for official chats",
        languagesTitle: "I speak several languages",
        lang1: "Russian - excellent",
        lang2: "English - excellent",
        lang3: "Ukrainian - good",
        lang4: "Chinese - learning",
        additionalInfoTitle: "Additional information",
        bgId1: "BG ID 1: 1220407424",
        bgId2: "BG ID 2: 350000",
        bgClan: "BG Clan: BedWar [Elder]",
        age: "Age: 16 years",
        location: "Location: Ryazan (Russia)",
        supportNotice: "All game-related questions are resolved only in the corresponding official chats. I don't provide individual help in private messages.",
        supportLink: "Game support chat",
        footerText: "© 2023 Blockman Go Ost. All rights reserved.",
        copied: "Copied to clipboard!"
    }
};

// Текущий язык
let currentLanguage = 'ru';

// Инициализация языка
function initLanguage() {
    // Проверяем сохраненный язык в localStorage
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    } else {
        // Определяем язык Telegram WebApp
        const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'ru';
        currentLanguage = tgLang.startsWith('ru') ? 'ru' : 'en';
    }
    
    // Устанавливаем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
    
    // Применяем перевод
    applyTranslations();
}

// Применяем перевод ко всем элементам с data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Переключаем язык
function switchLanguage(lang) {
    if (translations[lang] && lang !== currentLanguage) {
        currentLanguage = lang;
        localStorage.setItem('appLanguage', lang);
        applyTranslations();
        
        // Обновляем активные кнопки
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Анимация переключения
        document.documentElement.classList.add('language-change');
        setTimeout(() => {
            document.documentElement.classList.remove('language-change');
        }, 300);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    
    // Обработчики для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});

// Экспортируем функцию для копирования текста
function showCopyNotification() {
    const notification = document.getElementById('notification');
    notification.textContent = translations[currentLanguage]['copied'];
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}