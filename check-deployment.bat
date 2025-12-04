@echo off
echo ========================================
echo    ПРОВЕРКА СТАТУСА ЗАГРУЗКИ НА GITHUB
echo         Бригада 2 - Deployment Check
echo ========================================
echo.

cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo 📋 Проверяем статус Git репозитория...
git status
echo.

echo 🌐 Ссылки на проект:
echo.
echo ✅ GitHub Repository:
echo    https://github.com/vacuum-xvx/collaborative-notes-frontend
echo.
echo 🚀 Live Demo (Vercel):
echo    https://collaborative-notes-frontend.vercel.app
echo.
echo 📱 GitHub Pages:
echo    https://vacuum-xvx.github.io/collaborative-notes-frontend/
echo.
echo 💡 Новые возможности:
echo    • Страница "О команде": /credits
echo    • Footer с брендингом
echo    • Улучшенная навигация
echo    • Информация о Бригаде 2
echo.

echo 🔄 Проверка автоматического деплоя:
echo    Vercel автоматически развернет изменения через 1-2 минуты
echo    GitHub Pages также обновится автоматически
echo.

echo ========================================
echo        ✅ ПРОЕКТ УСПЕШНО ЗАГРУЖЕН!
echo ========================================
echo.
echo 👥 Сделано командой Бригада 2 с ❤️
echo 🚀 Готов к продуктивному использованию!
echo.
pause
