# React Movies – TMDB Client

A React application that lets you browse movies, view details, and manage your favorite titles using The Movie Database (TMDB) API. Authentication is performed through TMDB’s approval flow and favorites are synchronized with the user’s TMDB account.


#### !!! IMPORTANT ===> Authentication Flow
This project uses TMDB’s authentication and approval flow. To sign in inside the app, you must first be logged into TMDB in your browser:

1) Before using the in-app Login, go to TMDB and sign in:
    - URL: https://www.themoviedb.org/login
    - username: `vivanovspam`
    - password: `eUXz5@Zn#0`

2) In this app, click the `Login` button. The app will:
    - Request a TMDB `request_token`
    - Redirect you to TMDB to approve the request

3) Since you are already logged into TMDB (step 1), you will only need to confirm the approval on TMDB and be redirected back to the app.

4) After redirect, the app finalizes the session and you will be authenticated in the app.

Notes:
- If you are not logged into TMDB before step 2, TMDB will prompt you to sign in there. For a smooth flow in this project, pre-login with the credentials above, then approve.

#### Installation
```
# 1) Install dependencies
npm install

# 2) Start development server
npm run dev

# 3) Build for production
npm run build

# 4 Start production server
npm run preview
```

#### Tech Stack
- React, React Router
- Redux Toolkit
- Axios
- TMDB API
- Bootstrap (styling) and Font Awesome (icons)