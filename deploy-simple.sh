#!/bin/bash

echo "=== ЗАГРУЗКА ПРОЕКТА НА GITHUB ==="
echo "Переходим в директорию проекта..."

cd "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo "Текущая директория:"
pwd

echo ""
echo "Проверяем статус git:"
git status

echo ""
echo "Добавляем все файлы:"
git add .

echo ""
echo "Создаем коммит:"
git commit -m "Final update: Complete Collaborative Notes Platform by Brigade 2

- Added Credits page with team information
- Enhanced Footer with branding
- Updated navigation and UI
- Added comprehensive documentation
- Ready for production deployment

Developed by Brigade 2 team"

echo ""
echo "Загружаем на GitHub:"
git push origin main

echo ""
echo "=== ГОТОВО! ==="
echo "Проект загружен на: https://github.com/vacuum-xvx/collaborative-notes-frontend"
