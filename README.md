# 🎲 Nat20

**Nat20** is an open-source D&D character sheet app built for modern players and GMs. It aims to be fast, clean, and simple — no logins, no clutter, just you and your adventurer.

Made by [@argonptg](https://github.com/argonptg), powered by [SvelteKit](https://kit.svelte.dev/), [libSQL (Turso)](https://turso.tech) and [Bun](https://bun.dev).

---

## ✨ Features

- 🧙 Create and manage D&D 5e characters  
- 📄 Autosaves and stores character data locally  
- 📝 Add notes to your character (no full sync required)  
- ⚔️ Clean and responsive UI (powered by shadcn-svelte)  
- ☁️ Optional sync with a Turso/libSQL backend (PocketBase support in the future)  

> 📌 Campaigns and more advanced features are coming soon!

---

## 📦 Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev)
- **UI Components:** [shadcn-svelte](https://ui.shadcn.dev)
- **Database:** [libSQL (Turso)](https://turso.tech) via HTTP
- **Storage:** LocalStorage and client-side persistence
- **Deployment:** [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/argonptg/nat20.git
cd nat20
```

### 2. Install dependencies

```bash
bun i
```

### 3. Push the database schema

```bash
bun run db:push
```

### 4. Run the dev server

```bash
bun run dev
```

> Make sure you have a valid Turso DB URL set up in your `.env` (see `.env.example`).

---

## 🛠 Configuration

Create a `.env` file:

```env
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your_turso_token
```

---

## 📚 Roadmap

- [x] Login/Register support
- [ ] Character sheet creation  
- [ ] JSON import/export  
- [ ] Editable character notes  
- [ ] Campaign support (group characters + shared notes)  
- [ ] Better mobile UI polish  

---

## 🤝 Contributing

Pull requests are welcome! If you have suggestions for features, improvements, or find bugs, open an issue or a PR.

---

## 🧙 About the Name

“**Nat20**” is a reference to rolling a natural 20 in Dungeons & Dragons — a critical success. This app aims to be just that: a critical hit for tabletop players everywhere.

---

## 📜 License

[MIT](./LICENSE)

---

> 🐉 May your rolls always be high, and your campaigns epic.
