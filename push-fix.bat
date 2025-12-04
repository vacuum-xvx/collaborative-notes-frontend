@echo off
echo ========================================
echo       ЗАГРУЗКА ИСПРАВЛЕНИЙ НА GITHUB
echo ========================================
echo.

cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo Добавляем изменения в git...
git add .

echo.
echo Создаем коммит с исправлением...
git commit -m "Fix: Remove unused Button import from Navbar.tsx - Vercel deployment fix"

echo.
echo Загружаем на GitHub...
git push origin main

echo.
echo ========================================
echo         ИСПРАВЛЕНИЯ ЗАГРУЖЕНЫ!
echo ========================================
echo.
echo ✅ Изменения загружены на GitHub
echo 🔄 Vercel автоматически запустит новую сборку
echo 🌐 Проверьте статус деплоя на dashboard.vercel.com
echo.
echo После успешного деплоя ваш сайт будет доступен!
echo.
pause
