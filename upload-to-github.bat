@echo off
echo =========================================
echo    ЗАГРУЗКА ПРОЕКТА НА GITHUB
echo =========================================
echo.

REM Переход в директорию проекта
cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo Текущая директория: %CD%
echo.

REM Проверка наличия Git
echo Проверяем наличие Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ОШИБКА] Git не найден в системе!
    echo.
    echo Для установки Git:
    echo 1. Перейдите на https://git-scm.com/download/windows
    echo 2. Скачайте и установите Git for Windows
    echo 3. Перезапустите командную строку
    echo 4. Запустите этот файл снова
    echo.
    pause
    exit /b 1
)

echo Git найден! Продолжаем...
echo.

REM Инициализация репозитория
echo [ШАГ 1] Инициализируем Git репозиторий...
git init
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось инициализировать репозиторий
    pause
    exit /b 1
)
echo ✓ Репозиторий инициализирован

REM Добавление файлов
echo.
echo [ШАГ 2] Добавляем файлы в репозиторий...
git add .
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось добавить файлы
    pause
    exit /b 1
)
echo ✓ Файлы добавлены

REM Создание коммита
echo.
echo [ШАГ 3] Создаем первый коммит...
git commit -m "Initial commit: Collaborative Notes Frontend - React + TypeScript app with Material-UI, Redux, and real-time collaboration"
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось создать коммит
    echo Возможно, нужно настроить пользователя Git:
    echo git config --global user.email "your-email@example.com"
    echo git config --global user.name "Your Name"
    pause
    exit /b 1
)
echo ✓ Коммит создан

echo.
echo =========================================
echo        УСПЕШНО ПОДГОТОВЛЕНО!
echo =========================================
echo.
echo Теперь выполните следующие шаги:
echo.
echo 1. Перейдите на https://github.com
echo 2. Нажмите "New repository"
echo 3. Введите название: collaborative-notes-frontend
echo 4. Описание: Platform for collaborative note-taking
echo 5. НЕ инициализируйте с README (у нас уже есть!)
echo 6. Создайте репозиторий
echo.
echo 7. Выполните команды (замените YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/collaborative-notes-frontend.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 8. Настройте GitHub Pages:
echo    Settings ^> Pages ^> Source: "GitHub Actions"
echo.
echo Готово! Ваш сайт будет доступен по адресу:
echo https://YOUR_USERNAME.github.io/collaborative-notes-frontend/
echo.
pause
