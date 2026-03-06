# React App Deployment Setup

## Firebase Hosting + GitHub Auto Deploy

---

# 1. Create Firebase Project

Go to:

https://console.firebase.google.com

Steps:

* Click **Create Project**
* Enter a project name
* Disable Google Analytics if not needed
* Finish project creation

This Firebase project will host the React application.

---

# 2. Install Firebase CLI

Install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

Verify installation:

```bash
firebase --version
```

---

# 3. Login to Firebase

Authenticate with your Google account:

```bash
firebase login
```

A browser window will open to complete authentication.

---

# 4. Open the React Project

Navigate to the project directory:

```bash
cd your-react-project
```

This repository uses the **main branch** as the deployment branch.

---

# 5. Initialize Firebase Hosting

Run:

```bash
firebase init hosting
```

Answer the prompts:

```
Use an existing project → Yes
Select the Firebase project created earlier
Public directory → dist
Configure as single-page app → Yes
Overwrite index.html → No
Set up GitHub deploy → No
```

Firebase will create two configuration files:

```
firebase.json
.firebaserc
```

---

# 6. Configure Hosting for React Router

Ensure `firebase.json` contains:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

This rewrite rule ensures **React Router works correctly when refreshing pages**.

---

# 7. Generate Firebase CI Token

GitHub Actions needs a Firebase CI token to authenticate deployments.

In your project folder run:

```bash
firebase login:ci
```

It will open a browser to authenticate.

After login you will get something like:

```
1//0gdfgdfgdfgdfgdfgdfgdf
```

Copy this token.

This token will be used by GitHub Actions to authenticate Firebase deployments.

---

# 8. Add Token to GitHub Repository Secrets

Open the repository on GitHub.

Navigate to:

```
Settings
→ Secrets and Variables
→ Actions
```

Click **New repository secret**.

Name:

```
<FIREBASE_TOKEN>
```

Value:

Paste the token generated earlier.

Save the secret.

---

# 9. Create GitHub Actions Workflow

Create the following directory in the project:

```
.github/workflows
```

Inside this directory create the file:

```
deploy.yml
```

Full path:

```
.github/workflows/deploy.yml
```

---

# 10. Add Deployment Workflow

Add the following content to `deploy.yml`:

```yaml
name: Deploy React App to Firebase

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm install

      - name: Run tests (if any)
        run: npm test --if-present

      - name: Build project
        run: npm run build

      - name: Deploy to Firebase
        run: |
          npm install -g firebase-tools
          firebase deploy --only hosting --token ${{ secrets.<FIREBASE_TOKEN> }}
```

This workflow automatically deploys the application whenever code is pushed to the **main** branch.

---

# 11. Commit and Push the Workflow

Add and commit the new workflow file:

```bash
git add .
git commit -m "setup firebase auto deployment"
git push origin main
```

---

# 12. Automatic Deployment Process

Once pushed, the deployment pipeline runs automatically:

```
Local Development
      ↓
git push origin main
      ↓
GitHub Repository
      ↓
GitHub Actions Workflow
      ↓
Install Dependencies (npm install)
      ↓
Build React Application (npm run build)
      ↓
Deploy to Firebase Hosting
      ↓
Live Website Updated
```

---

# 13. Firebase Hosting URL

After deployment the application will be available at:

```
https://your-project.web.app
```

or

```
https://your-project.firebaseapp.com
```

Every future push to the **main** branch will automatically rebuild and deploy the application.

---

# Final Result

A complete **CI/CD pipeline** is established:

```
Local Development
      ↓
Git Push
      ↓
GitHub Repository
      ↓
GitHub Actions CI Pipeline
      ↓
React Application Build
      ↓
Firebase Hosting Deployment
      ↓
Production Website Update
```
