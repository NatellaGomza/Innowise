## Task

The full task description can be found here:
https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f

---

## How to Run the App

1. **Install dependencies**  
   Make sure you have Node.js (v18+) installed. Then run:
   ```bash
   npm install

2. **Start the development server**
    ```bash
    npm start

  This will launch the app in your default browser at http://localhost:3000.

3. **Build for production**

    ```bash
    npm run build
   
  The optimized output will be placed in the config/dist folder.


## Project Structure

```text
Innowise/
├── .husky/              # Git hooks for commit automation
├── dist/                # Production build output
│   ├── .babelrc         # Babel config for transpilation
│   └── webpack.config.js # Webpack config for bundling
├── node_modules/        # Installed dependencies
├── src/                 # Source code of the application
│   ├── scripts/         # JavaScript logic and modules
│   │   ├── Calculator.js# Main calculator logic
│   │   └── index.js     # Entry point
│   ├── index.html       # HTML entry point
│   └── styles.css       # Global styles
├── .gitignore           # Files excluded from Git
├── .prettierrc          # Prettier formatting rules
├── eslint.config.mjs    # ESLint configuration
├── package.json         # Project metadata and scripts
├── package-lock.json    # Dependency version lock
└── README.md            # Project documentation
