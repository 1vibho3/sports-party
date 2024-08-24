# Soccer Party Microservice Application
  A soccer party microservice web app where users can make friends and invite them for soccer watch party. Users can select upcoming fixtures acorss five major soccer leagues fetched from Live API , specify exact location while inviting friends using Google Map APIs, and receives invite notifications.

  ![image](https://github.com/user-attachments/assets/da3c1f70-0c90-4887-8a4f-f5b9eb6a6a11)
# Built With
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [NodeJS](https://nodejs.org/en)
  - [Express](https://expressjs.com/)
  - [React](https://react.dev/)
  - [MongoDB](https://account.mongodb.com/account/login?n=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F6602489b8deef30f1bbf8904&nextHash=%23security%2Fnetwork%2FaccessList&signedOut=true)

# Getting Started

## Pre-requisites
- Install latest NodeJS version
- Get Free API Key from RapidAPI for the below URL
  - https://api-football-v1.p.rapidapi.com/v3/fixtures

## Installation
- Clone the repository
```
git clone https://github.com/github_username/repo_name.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Enter your API in env file in backend/sports-party/match-service/src
```
const RAPIDAPI_KEY = 'ENTER YOUR API'
```
- Build and run backend
```
npm run start:all
```
- Build and run frontend
```
npm start
```
- Navigate to `http://localhost:3000`

