## Brain Share

Brain Share is a powerful knowledge management platform that enables users to manage a **"second brain" — a collection of documents** with a **wysiwyg editor** featuring document tagging, and full CRUD operations. Users can also **share documents anonymously** with **view-only share link**.

---

### 🚀 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS  
- **Database:** MongoDB  
- **Authentication:** Clerk  
- **Editor:** TipTap (Rich Text Editor)  
---

### 🎯 Key Features

✅ **Rich Text Document Management:**  
Leverage TipTap's rich text editor to create, format, and maintain documents efficiently.

✅ **Tagging and Organization:**  
Add tags to documents to enable easy categorization and filtering.

✅ **Full CRUD Operations:**  
- Create, view, update, and delete documents effortlessly.  
- Maintain a seamless workflow with intuitive UI/UX.

✅ **Anonymous Document Sharing:**  
Easily share documents with view-only access via unique links.

✅ **Authentication and Authorization**  
Seamless authentication and session management powered by Clerk.


---

### 🔮 Future Scope

🚧 **1. Editor Access and Real-Time Collaboration**  
- Implement collaborative document editing using **Liveblocks** to enable multiple users to work on the same document in real-time.

🧠 **2. AI Autocomplete and Enhanced AI Features**  
- Add AI-powered autocomplete and other intelligent features to enhance the document creation and editing experience.

---

### 📚 Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/your-repo/brain-share.git
cd brain-share
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
- Configure your `.env` file with required keys:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
MONGODB_URI=<your-mongodb-uri>
NEXT_API_BASE_URL=<your-api-base-url>

```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```

---
### Todos
- [ ]  Migrate authentication from clerk to next-auth for in house user management
---

### 🤝 Contributing
Contributions are welcome! If you encounter issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

