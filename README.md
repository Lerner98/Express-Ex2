# Book Author Microservice

A full-stack application for managing authors and books, built with a React frontend and an Express backend. The frontend runs on `http://localhost:3000`, and the backend runs on `http://localhost:4000`.

## Project Structure
- `frontend/`: React frontend (runs on `http://localhost:3000`)
- `backend/`: Express backend (runs on `http://localhost:4000`)
- `data/`: JSON files for storing authors and books (`authors.json`, `books.json`)

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (v6 or higher recommended)
- A Cloudinary account (for image uploads)

## Setup Instructions

### Step 1: Clone the Repository
Clone the repository to your local machine:
```bash
git clone <repository-url>
cd book-author-microservice



Step 2: Set Up Environment Variables
Copy the .env.example file to .env:


copy .env.example .env
Open .env in a text editor and fill in your Cloudinary credentials:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REACT_APP_API_URL=http://localhost:4000
Replace your_cloud_name, your_api_key, and your_api_secret with your Cloudinary account credentials.
REACT_APP_API_URL is already set to http://localhost:4000, which matches the backend port.

Step 3: Install Dependencies
This project has three package.json files: one in the root, one in frontend/, and one in backend/. You need to run npm i in each directory to install dependencies.

Install Root Dependencies (for running both frontend and backend together):



npm i
This installs concurrently, which is used to run the frontend and backend simultaneously.
Install Frontend Dependencies:



cd frontend
npm i
cd ..
This installs dependencies for the React frontend (react, axios, react-router-dom, etc.).
Install Backend Dependencies:



cd backend
npm i
cd ..
This installs dependencies for the Express backend (express, bcrypt, cloudinary, etc.).


Step 4: Run the Application
Start Both Frontend and Backend:
From the root directory (book-author-microservice/), run:



npm run dev
This starts both the backend (on http://localhost:4000) and the frontend (on http://localhost:3000) simultaneously using concurrently.





Step 5: Test the Application

Manage Authors:
Add Guy Lerner:
Name: Guy Lerner
Email: guy.lerner@example.com
Password: password123
Bio: Renowned author of fantasy novels
Add Daniel Seth:
Name: Daniel Seth
Email: daniel.seth@example.com
Password: password123
Bio: Author of epic science fiction sagas
Verify in data/authors.json that both authors are added.
Test editing and deleting authors as needed.


Manage Books:

Add Lord of the Rings:
Title: Lord of the Rings
ISBN: 978-0544003415
Genre: Fantasy
Published Year: 1954
Image: Upload a book cover image (requires Cloudinary credentials)

Add Dune:
Title: Dune
ISBN: 978-0441172719
Genre: Science Fiction
Published Year: 1965
Image: Upload a book cover image
Verify in data/books.json that both books are added.
Test editing and deleting books as needed.


Notes
Cloudinary Credentials: You’ll need a Cloudinary account to upload book cover images. If you don’t have credentials, you can create a free account at Cloudinary and update the .env file with your credentials.
Ports: The frontend runs on port 3000, and the backend runs on port 4000. If these ports are in use, you can change them in frontend/package.json (for the frontend) and backend/server.js (for the backend).
Dependencies: Ensure you run npm i in the root, frontend/, and backend/ directories as specified in the setup instructions.
Testing: The project has been tested with the authors and books listed above. Ensure your Cloudinary credentials are set up to test image uploads.