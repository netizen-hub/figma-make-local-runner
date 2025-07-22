# Figma Make Local Runner

A skeleton project designed to run code downloaded from Figma Make locally, so you can easily modify the generated code with your favorite tools.


This project comes with several pre-installed packages that Figma-generated code may require. If you encounter errors about missing dependencies, you may need to install additional packages as needed.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FigmaMakeLocalRunner
```

### 2. Download Code from Figma Make

1. Export your code from Figma Make
2. Decompress the downloaded files
3. Copy all the files and folders into the `src` directory of this project

**Important**: Make sure to replace or merge with the existing files in the `src` folder. The current `src` folder contains a demo application that you should replace with your Figma Make code.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
