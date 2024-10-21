
---

# Social Media Application - Workflow Setup

## Overview

This project focuses on setting up a solid workflow for developing the social media application. Below are the tools and packages used to improve code quality and make the development process smoother.

## Tools Installed

- **ESLint**: Automatically checks for code issues and keeps code consistent.
- **Prettier**: Formats the code to maintain a clean and unified style.
- **Husky**: Blocks commits if there are issues, ensuring only clean code gets committed.
- **Jest**: Used for running unit tests (e.g., testing login and logout functions).
- **Cypress**: End-to-end testing tool for testing how the app works in a browser.
- **SASS**: Used for compiling SCSS files into CSS for better styling management.

## NPM Scripts

- **Install everything**:
  ```bash
  npm install
  ```

- **Format the code (ESLint + Prettier)**:
  ```bash
  npm run format
  ```

- **Run unit tests with Jest**:
  ```bash
  npm test
  ```

- **Open Cypress for end-to-end tests**:
  ```bash
  npm run cy:open
  ```

## Workflow Setup

- All development happens in the `workflow` branch. 
- **Husky** is configured to stop commits if there are any code issues (like failed tests or formatting problems). Make sure to fix errors before committing.
- To bypass Husky issues, run the following commands before trying to commit:
  ```bash
  npm run format
  npm start
  ```

  Then:
  ```bash
  git add .
  git commit -m "your message"
  ```

## Summary of Installed Packages

- **ESLint**: Enforces code style rules.
- **Prettier**: Automatically formats code.
- **Husky**: Runs checks before allowing commits.
- **Jest**: For unit testing.
- **Cypress**: For end-to-end testing.


---
