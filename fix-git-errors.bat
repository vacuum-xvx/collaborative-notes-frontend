@echo off
echo ========================================
echo         ИСПРАВЛЯЕМ ОШИБКИ GIT
echo ========================================
echo.

cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo Текущая директория: %CD%
echo.

echo [ПРОВЕРКА] Проверяем статус репозитория...
git status
echo.

echo [ИСПРАВЛЕНИЕ 1] Удаляем существующий remote origin...
git remote remove origin 2>nul
echo ✓ Remote origin удален

echo.
echo [ИСПРАВЛЕНИЕ 2] Добавляем правильный remote origin...
git remote add origin https://github.com/vacuum-xvx/collaborative-notes-frontend.git
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось добавить remote origin
    pause
    exit /b 1
)
echo ✓ Remote origin добавлен

echo.
echo [ПРОВЕРКА] Проверяем, есть ли коммиты...
git log --oneline -1 2>nul
if %errorlevel% neq 0 (
    echo [ИСПРАВЛЕНИЕ 3] Создаем первый коммит...
    git add .
    git commit -m "Initial commit: Collaborative Notes Frontend"
    if %errorlevel% neq 0 (
        echo [ОШИБКА] Не удалось создать коммит
        echo Возможно, нужно настроить Git пользователя:
        echo git config --global user.name "Your Name"
        echo git config --global user.email "your-email@example.com"
        pause
        exit /b 1
    )
    echo ✓ Коммит создан
) else (
    echo ✓ Коммиты уже существуют
)

echo.
echo [ИСПРАВЛЕНИЕ 4] Переименовываем ветку в main...
git branch -M main
echo ✓ Ветка переименована в main

echo.
echo [ФИНАЛ] Загружаем на GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось загрузить на GitHub
    echo Проверьте:
    echo 1. Создан ли репозиторий на GitHub?
    echo 2. Правильно ли указан URL репозитория?
    echo 3. Есть ли доступ к репозиторию?
    pause
    exit /b 1
)

echo.
echo ========================================
echo           УСПЕШНО ЗАГРУЖЕНО!
echo ========================================
echo.
echo ✅ Проект загружен на GitHub!
echo 🌐 URL репозитория: https://github.com/vacuum-xvx/collaborative-notes-frontend
echo.
echo Для настройки GitHub Pages:
echo 1. Перейдите в Settings репозитория
echo 2. Pages ^> Source: "GitHub Actions"
echo.
echo Ваш сайт будет доступен по адресу:
echo https://vacuum-xvx.github.io/collaborative-notes-frontend/
echo.
pause
