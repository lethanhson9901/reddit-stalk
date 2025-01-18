# 🔍 Reddit Stalk

[![GitHub deployments](https://img.shields.io/github/deployments/lethanhson9901/reddit-stalk/github-pages?label=deployment)](https://lethanhson9901.github.io/reddit-stalk)
[![GitHub last commit](https://img.shields.io/github/last-commit/lethanhson9901/reddit-stalk)](https://github.com/lethanhson9901/reddit-stalk/commits/main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive blog and content management platform built with React, Firebase, and Tailwind CSS. 

## ✨ Features

- 🌗 Dark/Light mode support with system preference detection
- 📱 Fully responsive design
- 🔍 Real-time search functionality
- 📂 Collapsible sidebar for content categories
- ⚡ Fast and smooth transitions
- 📊 Reading time estimation
- 🎨 Modern UI with Tailwind CSS
- 🎯 Category-based content filtering
- 🔒 Secure Firebase admin authentication
- 🔐 Public/Private post management

## 🚀 Demo

Visit the live demo: [Reddit Stalk](https://lethanhson9901.github.io/reddit-stalk)

## 🛠️ Technologies Used

- React 18
- Firebase (Authentication, Realtime Database)
- Tailwind CSS
- Lucide Icons
- React Router
- GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/lethanhson9901/reddit-stalk.git
cd reddit-stalk
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication and Realtime Database
- Copy your Firebase configuration

4. Create a `.env` file with the following variables:
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_DATABASE_URL=your_firebase_database_url
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_BASE_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm start
```

## 🔧 Firebase Setup

### Authentication
1. Enable Email/Password authentication in Firebase Console
2. Create a new admin user through the Authentication section
3. Note down the admin user's UID from the Authentication dashboard

### Realtime Database
1. Create a new Realtime Database
2. Set up the following security rules:
```json
{
  "rules": {
    "admins": {
      ".read": "auth != null",
      ".write": "auth != null && (!data.exists() || root.child('admins').child(auth.uid).val() === true)"
    },
    "posts": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    }
  }
}
```
3. Add the admin user's UID to the database with this structure:
```json
{
  "admins": {
    "YOUR_ADMIN_UID": true
  }
}
```

## 🚀 Deployment

The project uses GitHub Actions for continuous deployment to GitHub Pages:

1. Set up GitHub Secrets in your repository:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - (Add all Firebase-related secrets from `.env`)
   - `DEPLOY_TOKEN` (GitHub Personal Access Token)

2. Push to the `main` branch to trigger deployment

## 🔐 Admin Access

1. Navigate to `/admin`
2. Log in with your Firebase admin credentials
3. Manage posts, toggle visibility, and edit content

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🛡️ Security Notes

- Never commit sensitive information like API keys
- Use environment variables for configuration
- Implement proper Firebase security rules
- Keep admin credentials secure and rotate periodically
- Database rules enforce admin-only write access to posts
- Admin authentication is verified through Firebase Auth and Realtime Database

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Son Le** - [GitHub](https://github.com/lethanhson9901)

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services
- [Lucide Icons](https://lucide.dev/) for beautiful icons