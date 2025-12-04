# Скрипт для загрузки проекта на GitHub
# PowerShell версия

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "    ЗАГРУЗКА ПРОЕКТА НА GITHUB" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Переход в директорию проекта
$ProjectPath = "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"
Set-Location $ProjectPath

Write-Host "Текущая директория: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Проверка наличия Git
Write-Host "Проверяем наличие Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git найден: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git не найден"
    }
} catch {
    Write-Host "❌ Git не найден в системе!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Для установки Git:" -ForegroundColor Yellow
    Write-Host "1. Перейдите на https://git-scm.com/download/windows"
    Write-Host "2. Скачайте и установите Git for Windows"
    Write-Host "3. Перезапустите PowerShell"
    Write-Host "4. Запустите этот скрипт снова"
    Write-Host ""
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host ""

# Инициализация репозитория
Write-Host "[ШАГ 1] Инициализируем Git репозиторий..." -ForegroundColor Cyan
try {
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Репозиторий инициализирован" -ForegroundColor Green
    } else {
        throw "Ошибка инициализации"
    }
} catch {
    Write-Host "❌ Не удалось инициализировать репозиторий" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Проверка конфигурации Git
Write-Host ""
Write-Host "Проверяем конфигурацию Git..." -ForegroundColor Yellow
$userName = git config --global user.name 2>$null
$userEmail = git config --global user.email 2>$null

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠️  Настройки Git не найдены" -ForegroundColor Yellow
    Write-Host ""
    $name = Read-Host "Введите ваше имя для Git"
    $email = Read-Host "Введите ваш email для Git"

    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✓ Конфигурация Git настроена" -ForegroundColor Green
} else {
    Write-Host "✓ Git настроен: $userName <$userEmail>" -ForegroundColor Green
}

# Добавление файлов
Write-Host ""
Write-Host "[ШАГ 2] Добавляем файлы в репозиторий..." -ForegroundColor Cyan
try {
    git add .
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Файлы добавлены" -ForegroundColor Green
    } else {
        throw "Ошибка добавления файлов"
    }
} catch {
    Write-Host "❌ Не удалось добавить файлы" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Создание коммита
Write-Host ""
Write-Host "[ШАГ 3] Создаем первый коммит..." -ForegroundColor Cyan
try {
    git commit -m "Initial commit: Collaborative Notes Frontend

- React + TypeScript application
- Material-UI for components
- Redux for state management
- Vite for build tooling
- TipTap for rich text editing
- Real-time collaboration features
- GitHub Pages deployment ready"

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Коммит создан" -ForegroundColor Green
    } else {
        throw "Ошибка создания коммита"
    }
} catch {
    Write-Host "❌ Не удалось создать коммит" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "        УСПЕШНО ПОДГОТОВЛЕНО!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Теперь выполните следующие шаги:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Перейдите на " -NoNewline
Write-Host "https://github.com" -ForegroundColor Blue
Write-Host "2. Нажмите 'New repository'"
Write-Host "3. Введите название: " -NoNewline
Write-Host "collaborative-notes-frontend" -ForegroundColor Green
Write-Host "4. Описание: " -NoNewline
Write-Host "Platform for collaborative note-taking with real-time editing" -ForegroundColor Green
Write-Host "5. " -NoNewline
Write-Host "НЕ" -ForegroundColor Red -NoNewline
Write-Host " инициализируйте с README (у нас уже есть!)"
Write-Host "6. Создайте репозиторий"
Write-Host ""

Write-Host "7. Затем выполните команды (замените YOUR_USERNAME на ваш GitHub username):" -ForegroundColor Yellow
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/collaborative-notes-frontend.git" -ForegroundColor Magenta
Write-Host "   git branch -M main" -ForegroundColor Magenta
Write-Host "   git push -u origin main" -ForegroundColor Magenta
Write-Host ""

Write-Host "8. Настройте GitHub Pages:" -ForegroundColor Yellow
Write-Host "   Settings > Pages > Source: 'GitHub Actions'"
Write-Host ""

Write-Host "🎉 Готово! Ваш сайт будет доступен по адресу:" -ForegroundColor Green
Write-Host "   https://YOUR_USERNAME.github.io/collaborative-notes-frontend/" -ForegroundColor Blue
Write-Host ""

Read-Host "Нажмите Enter для завершения"
