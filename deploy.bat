@echo off
cd /d "%~dp0"
echo.
echo ===== サイトを更新中... =====
echo.
git add .
git commit -m "サイト更新 %date% %time%"
git push
echo.
echo ===== 完了！1〜2分でサイトに反映されます =====
echo.
pause
