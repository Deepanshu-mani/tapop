
TAPOP 🎨

TAPOP is an engaging and interactive web application designed to showcase beautiful 3D animations and smooth transitions. It is built using React, GSAP (GreenSock Animation Platform) for animations, Tailwind CSS for styling, and Firebase Authentication for login and signup functionality. TAPOP demonstrates the power of modern web development tools while offering an excellent user experience.

🚀 Live Demo

Check out the live version of TAPOP here: [Live Demo](https://tapop-theta.vercel.app)

🌇 **ScreenShot** 

<img width="1710" alt="Screenshot 2024-12-03 at 11 55 05 AM" src="https://github.com/user-attachments/assets/e4c695de-22be-4afa-aaad-2ad8c7d90ccd">

🛠️ Features

TAPOP has several exciting features:
	•	3D Animations: Interactive 3D effects triggered by mouse movements, creating a dynamic feel.
	•	Smooth Transitions: Visual elements smoothly transition in and out, enhancing the user experience.
	•	Responsive Design: Fully responsive for various devices, from desktop to mobile.
	•	Customizable Themes: Easily change visual elements and styles to match different design needs.
	•	Firebase Authentication: Users can sign up, log in, and authenticate using Firebase Authentication.

🖥️ Tech Stack

TAPOP is built using the following technologies:
	•	React: A JavaScript library for building user interfaces. It allows us to create reusable UI components and efficiently update the UI based on user interaction.
	•	Tailwind CSS: A utility-first CSS framework that provides pre-built classes for styling. It allows us to quickly build responsive and modern designs without writing custom CSS.
	•	GSAP: A powerful library for creating animations. GSAP is used here to create 3D rotations, transitions, and smooth visual effects.
	•	Firebase Authentication: Firebase provides easy-to-use authentication services. It allows users to register, log in, and manage sessions securely in the app.

🔧 Installation

To run TAPOP on your local machine, follow these steps:
	1.	Clone the Repository

Open your terminal (command prompt) and type the following command to clone the project:

git clone https://github.com/Deepanshu-mani/tapop.git


Then navigate into the project directory:

cd tapop

	2.	Install Dependencies

Before running the app, you need to install the required dependencies. In the terminal, run:

npm install

This will install all the necessary libraries and packages that the project depends on.
	3.	Set Up Firebase

Before running the app, you need to set up Firebase Authentication. Follow these steps:
	•	Go to the Firebase Console.
	•	Create a new project or use an existing one.
	•	Go to Authentication in the Firebase console and enable Email/Password Authentication.
	•	Click on the Web icon to get the Firebase configuration, which will look like this:

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

	•	Create a firebase.js file inside the src/ folder and add the Firebase configuration code.

import firebase from "firebase/app";
import "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

	4.	Start the Development Server

Now that the dependencies are installed and Firebase is configured, you can start the development server. Run this command:

npm start

This will start a local server and open the application in your default web browser. The app will reload automatically when you make changes to the source code.
	5.	Build for Production (Optional)

If you want to create a production-ready version of the app, you can build the project by running:

npm run build

This will create a build folder with the optimized production code, ready to be deployed.

🎯 Usage

Once the app is running, you will see the main homepage with interactive 3D elements. Here’s how you can interact with the app:
	1.	Hover over or click on the elements: The images and icons will transition smoothly as the mouse moves across the screen.
	2.	Watch the animations: The background, avatars, widgets, and titles will animate in 3D, creating an immersive experience.
	3.	Sign Up or Log In: Use the Firebase authentication system to sign up and log in with an email/password.
	4.	Customizing the theme: You can easily modify the images, icons, and text to fit your own theme by changing the respective arrays and CSS classes.

🌟 Customizing the App

If you’d like to customize TAPOP for your own use case, here’s how:
	1.	Change Images:
	•	The app uses arrays of images like avatarArray, bgArray, itemArray, and widgetArray in the utils/imagesArray.js file. You can update these arrays with your own image paths to change the visuals.
	2.	Change Icons:
	•	Icons are defined in utils/icons.js. Modify the iconSets array to replace existing icons with new ones.
	3.	Change Titles:
	•	You can modify the text and style of the titles by updating the titles.js file inside the utils folder. Each title set has different background classes and text that can be customized.
	4.	Firebase Authentication:
	•	You can modify the Firebase authentication logic in the firebase.js file to add additional authentication methods (e.g., Google, Facebook).
	5.	Tailwind CSS:
	•	You can adjust the app’s design by editing the tailwind.config.js or directly modifying the classes in the React components.

🎯 Example Use Cases

TAPOP can be used for various interactive and visually engaging applications:
	•	Portfolio Websites: Showcase your projects or designs with dynamic effects.
	•	Landing Pages: Engage users right from the start with smooth animations.
	•	Product Showcases: Display products with rotating 3D effects for an immersive experience.

🌐 Contributing

We welcome contributions! To help improve TAPOP, follow these steps:
	1.	Fork the repository.
	2.	Create a new branch: git checkout -b feature/your-feature-name
	3.	Make your changes and commit them: git commit -m 'Add a new feature'
	4.	Push your changes to your fork: git push origin feature/your-feature-name
	5.	Create a pull request to the main repository.

🤝 Contact

Feel free to reach out for questions, suggestions, or collaborations:
	•	GitHub: Deepanshu Kumar Mani
	•	LinkedIn: Deepanshu Kumar Mani

📝 License

This project is licensed under the MIT License. You’re free to use, modify, and distribute it as per the terms of the MIT license.

Let me know if you need any further adjustments!
