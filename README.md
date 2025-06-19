# Event Scheduler

A modern, responsive web application for managing and organizing your events with AI-powered features.

## 🚀 Features

- **Firebase Authentication**: Secure email/password authentication
- **Real-time Database**: Events stored and synced with Firestore
- **AI-Powered Summarization**: Automatically summarize event descriptions using OpenAI
- **Advanced Filtering**: Filter events by title, location, date range, and status
- **Status Tracking**: Track events as upcoming, attending, maybe, or declined
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Changes sync instantly across all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Integration**: OpenAI GPT-3.5
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (version 16 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled
- OpenAI API key

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd event-scheduler
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication with Email/Password provider
4. Enable Firestore Database
5. Get your Firebase configuration from Project Settings

### 3. OpenAI Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Ensure you have sufficient credits for API calls

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 5. Firestore Security Rules

Add these security rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📱 Usage

### Getting Started
1. Sign up for a new account or sign in with existing credentials
2. Create your first event using the "New Event" button
3. Fill in event details (title, date, time, location, description, status)
4. Use the AI summarizer to automatically condense long descriptions

### Managing Events
- **View Events**: All your events are displayed in a responsive card layout
- **Edit Events**: Click the edit icon on any event card
- **Delete Events**: Click the trash icon (with confirmation)
- **Filter Events**: Use the filter panel to find specific events

### AI Features
- Click "Summarize with AI" in the event form to automatically condense descriptions
- The AI will preserve important details while making text more concise

## 🔧 Configuration

### Firebase Configuration
- Authentication providers can be modified in Firebase Console
- Firestore indexes will be created automatically based on queries

### OpenAI Configuration
- Model: Currently uses GPT-3.5-turbo
- Token limit: 150 tokens for summaries
- Temperature: 0.3 for consistent results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Firebase services are properly configured
4. Check OpenAI API key and account credits

## 🔮 Future Features

- Event reminders and notifications
- Calendar integration
- Event sharing and collaboration
- Recurring events
- Event categories and tags
- Export events to various formats
- Offline support with synchronization

---

Built with ❤️ using React, Firebase, and OpenAI