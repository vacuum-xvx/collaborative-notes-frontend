@echo off
echo =================================
echo   ЗАГРУЗКА НА GITHUB - Бригада 2
echo =================================

REM Переход в правильную директорию
cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo Текущая директория: %CD%
echo.

echo Проверяем git статус...
git status
echo.

echo Добавляем все файлы...
git add .
echo.

echo Создаем коммит...
git commit -m "Complete Collaborative Notes Platform by Brigade 2 - Frontend with Credits page, Footer, enhanced UI and full documentation"
echo.

echo Загружаем на GitHub...
git push origin main
echo.

if %errorlevel% equ 0 (
    echo =================================
    echo      ✅ УСПЕШНО ЗАГРУЖЕНО!
    echo =================================
    echo.
    echo 🌐 GitHub: https://github.com/vacuum-xvx/collaborative-notes-frontend
    echo 🚀 Vercel: https://collaborative-notes-frontend.vercel.app
    echo 📱 Pages: https://vacuum-xvx.github.io/collaborative-notes-frontend/
    echo.
    echo ✨ Новые возможности:
    echo    • Страница Credits: /credits
    echo    • Footer с брендингом
    echo    • Информация о Бригаде 2
    echo.
    echo 👥 Сделано командой Бригада 2 с ❤️
) else (
    echo ❌ Ошибка при загрузке
    echo Проверьте настройки git и интернет соединение
)

pause
