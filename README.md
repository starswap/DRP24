# Elderly Loneliness DRP Project

## Setup
1. Run the following setup commands:
```
git config --local core.autocrlf input
cd frontend && npm install
```
2. Go to VSCode settings and select Workspace. Search EOL and select '\n'. This should cause a .vscode folder to be created with settings.json containing:
```
{
    "files.eol": "\n"
}
```
3. Install ESLint VSCode extension and go to settings (UI). Turn on "ESLint:Format Enable"
4. Go to a Typescript file in the project and press Ctrl-Shift-P. Select "Format document with" and then "Configure Default Formatter". Choose ESLint.

## Backend
Firebase database means that many endpoints are unnecessary. For the AI stuff use Python on Heroku. To run this locally install the dependencies with pip (e.g. venv if you want) then `python backend/app.py` from the root of the repo. Or use Docker.

## Tests
We are using Jest for the tests. You can run them with `npm run test`. The CI pipeline runs them automatically and will upload a report which you can find among the jobs of the latest run in the actions tab.
