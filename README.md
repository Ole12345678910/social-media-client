
---

# Social Media Application - Workflow Setup

## Overview

This project sets up a development workflow for a social media application. The goal is to ensure high-quality code and efficient testing using various tools and packages.

## Tools Installed

- **ESLint**: Automatically checks for code issues.
- **Prettier**: Formats the code for a consistent style.
- **Husky**: Prevents commits if there are issues, making sure only clean code is committed.
- **Jest**: Used for running unit tests.
- **Cypress**: End-to-end testing tool to simulate user interactions.
- **SASS**: Compiles SCSS files into CSS for easier styling.

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

- **Run the live server and watch for SASS changes**:
  ```bash
  npm start
  ```

- **Run Cypress end-to-end tests headlessly**:
  ```bash
  npm run cy:test:run
  ```

- **Open Cypress Test Runner**:
  ```bash
  npm run cy:test:open
  ```

## Workflow Setup

- Development happens in the `workflow` branch.
- **Husky** is set up to prevent commits if there are issues with linting or tests. If you're blocked from committing, run the following:
  ```bash
  npm run format
  npm test
  ```

  Then try committing again:
  ```bash
  git add .
  git commit -m "your message"
  ```

## Summary of Installed Packages

- **ESLint**: Enforces code quality rules.
- **Prettier**: Auto-formats code for consistency.
- **Husky**: Runs pre-commit checks.
- **Jest**: For unit testing.
- **Cypress**: For end-to-end testing.

---
