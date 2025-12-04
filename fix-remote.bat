cd "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"cd "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"@echo off
cd /d "C:\Users\User\PycharmProjects\PythonMain\collaborative-notes-frontend"

echo Текущие remote настройки:
git remote -v
echo.

echo Обновляем remote origin на правильный URL...
git remote set-url origin https://github.com/vacuum-xvx/collaborative-notes-frontend.git

echo.
echo Проверяем обновленные настройки:
git remote -v

echo.
echo Готово! Теперь можно выполнить:
echo git push -u origin main

pause
