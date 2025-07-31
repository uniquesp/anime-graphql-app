# 🎌 Anime GraphQL App

<div align="center">
  
  **A full-stack Anime Tracker built using React, Apollo Client, and GraphQL**
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
  ![Ruby on Rails](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
  ![Apollo](https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
</div>

---

## ✨ GraphQL Pagination Strategies Showcase

This app demonstrates various **GraphQL pagination strategies**:

<div align="center">

| Strategy | Icon | Description |
|----------|------|-------------|
| **Offset-based** | 📄 | Traditional pagination with page numbers |
| **Cursor-based** | 🔗 | Forward navigation using cursors |
| **Relay-style** | 🎯 | Bi-directional with forward & backward |
| **Infinite Scroll** | 🔄 | Auto-loading content as you scroll |

</div>

You can **Create**, **Read**, **Update**, and **Delete** anime entries — with a clean UI and smooth pagination.

---

## 🔗 Live Demo

<div align="center">
  
  ### 🌐 **[anime-graphql-app.vercel.app](https://anime-graphql-app.vercel.app/)**
  
  <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="300"/>
  
</div>

---

## 📦 Features

<div align="center">

<table>
<tr>
<td align="center" width="50%">

### 🎯 Core Features
- 📋 **Full CRUD** on anime list
- 💅 **Beautiful** and simple React UI
- 🧠 **Educational** project for GraphQL beginners
- ⚡ **Real-time** updates with Apollo Client

</td>
<td align="center" width="50%">

### 🔄 Pagination Types
- 🔁 **Offset pagination** (limit + offset)
- 🔗 **Cursor pagination** (after + limit)
- 🎯 **Relay-style** pagination (after/before, first/last)
- 🔄 **Infinite scroll** using Relay-style

</td>
</tr>
</table>

</div>

---

## 📂 Folder Structure

```
anime-graphql-app/
├── 🗄️ backend/               # Apollo Server (GraphQL)
│   ├── 📊 data.js            # Static anime data
│   ├── 📋 schema.js          # TypeDefs + Resolvers
│   └── 🚀 index.js           # Server entry point
│
└── 💻 frontend/              # React + Apollo Client
    ├── 🧩 components/        # AnimeCard, Forms, Pagination UIs
    ├── 🔍 graphql/           # Queries and mutations
    ├── 📱 pages/             # Views like AnimeList
    └── ⚛️ App.js             # Main App
```

---

## ⚙️ Getting Started (Local Setup)

<div align="center">
  <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" width="200"/>
  
  > ✅ Make sure **Node.js** and **npm** are installed on your machine.
</div>

### 1. 📥 Clone the repository

```bash
git clone https://github.com/your-username/anime-graphql-app.git
cd anime-graphql-app
```

### 2. 🚀 Start the Backend (GraphQL Server)

```bash
cd backend
npm install
node index.js
```

<div align="center">
  <img src="https://img.shields.io/badge/GraphQL_Server-http://localhost:4000/graphql-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL Server"/>
</div>

### 3. 💻 Start the Frontend (React App)

Open a new terminal tab or window:

```bash
cd frontend
npm install
npm start
```

<div align="center">
  <img src="https://img.shields.io/badge/React_App-http://localhost:3000-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React App"/>
</div>

✅ **Now the app should be running and connected to your GraphQL backend.**

---

## 📚 Read the Blog

<div align="center">
  <img src="https://media.giphy.com/media/LaVp0AyqR5bGsC5Cbm/giphy.gif" width="200"/>
  
  **Want to understand how pagination works in GraphQL with Apollo Client?**
  
  [![Blog](https://img.shields.io/badge/📖_Read_Blog-GraphQL_Pagination_in_React-4285F4?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@uniquesp13/graphql-pagination-in-react-offset-vs-cursor-2bbb04011873)
  
</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Ruby on Rails](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

### Data
![In-Memory](https://img.shields.io/badge/Static_Data-data.js-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white)

</div>

---

## 🤝 Contributing

<div align="center">
  
  **If you find bugs or want to suggest improvements, feel free to fork and raise a PR.**
  
  **Contributions are welcome! 🎉**
  
  [![Contribute](https://img.shields.io/badge/🤝_Contribute-Fork_&_PR-28a745?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username/anime-graphql-app/fork)
  
</div>

---
  
  **Happy Coding! 🚀✨**
  
</div>
