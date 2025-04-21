# 🍬 React Candy Store

Welcome to the React Candy Store—a full-stack CRUD (Create, Read, Update, Delete) application built with **React** and **TypeScript**. This app allows users to manage a list of candies by adding, editing, and deleting entries via a clean, responsive UI.

---

## Tech Stack

- **Frontend:** React + TypeScript
- **State Management:** React Context API
- **Routing:** React Router DOM
- **API Interaction:** Custom service layer using `fetch`
- **Styling:** CSS Modules / Bootstrap
- **Backend:** MockAPI

---

## Features

- **Add** a new candy
- **View** all candies on the homepage
- **Edit** existing candy entries
- **Delete** candies
- Global state management via React Context
- Modular structure with clear separation of concerns (pages, services, context, types)

---

## Project Structure

```bash
src/
├── assets/         # Static files (images, CSS)
├── context/        # CandyContext for global state
├── pages/          # AddCandy, EditCandy, Home components
├── services/       # API service layer
├── types/          # TypeScript interfaces
├── App.tsx         # App routes and layout
└── main.tsx        # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MockAPI or other backend set up with the appropriate endpoints

### Installation

```bash
git clone https://github.com/james-franchino/react-candy-store.git
cd react-candy-store
npm install
```

### Running the App

```bash
npm run dev
```

Make sure your backend API is running and matches the base URL defined in `candyService.ts`.

---

Thanks for visiting! 🍭
