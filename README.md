# Elderly Loneliness DRP Project

## Setup
1. 
```
git config --local core.autocrlf input
cd frontend && npm install
cd ../backend && npm install
```
2. Go to VSCode settings and select Workspace. Search EOL and select '\n'. This should cause a .vscode folder to be created with settings.json containing:
```
{
    "files.eol": "\n"
}
```
3. Install ESLint VSCode extension and go to settings (UI). Turn on "ESLint:Format Enable"