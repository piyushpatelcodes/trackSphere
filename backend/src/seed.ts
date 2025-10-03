const mongoose = require('mongoose');
const { InternSchema } = require('./intern/intern.schema.ts');
import { faker } from '@faker-js/faker';

// import { Intern } from './intern/intern.model.ts'; 

// const dbUri = 'mongodb://localhost:27017/your_db_name';
const dbUri = 'mongodb+srv://piyushpatelcodes:7XTQTUxJ15huRpsD@cluster0.2sv5x1k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbUri);

const InternModel = mongoose.model('Intern', InternSchema);
const allProjects = [
  "Setup GitHub Automation",
  "Implement Payment Paywall",
  "UI Dashboard Development",
  "E-commerce Cart Integration",
  "Social Media Feed Display",
  "Customer Feedback Collection",
  "User Authentication Flow",
  "Interactive Data Visualization",
  "Blog CMS Creation",
  "Event Registration System",
  "Task Management Tool",
  "Profile Customization Dashboard",
  "Video Streaming Platform",
  "Restaurant Menu and Ordering UI",
  "Stock Market Dashboard",
  "Fitness Tracker UI",
  "Chat Application UI",
  "Online Education Platform",
  "Virtual Portfolio Website",
  "Online Auction Platform",
  "Project Management System UI",
  "Time Tracking App UI",
  "Personal Finance Management Tool",
  "Collaborative Whiteboard UI",
  "Real-Time Stock Price Ticker",
  "Movie Ticket Booking UI",
  "Weather Forecast Dashboard",
  "Online Voting System UI",
  "Chatbot Integration UI",
  "Peer-to-Peer Lending UI",
  "Online Resume Builder UI",
  "Inventory Management System UI",
  "Survey & Polling System",
  "Real-Time Location Sharing UI",
  "News Aggregator UI",
  "Fitness Class Booking System",
  "Social Event Planning UI",
  "Multi-Currency Converter UI",
  "Photo Editing App UI",
  "Social Networking App UI"
];

const sdeSkills = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Data Structures',
  'Algorithms',
  'System Design',
  'SQL',
  'NoSQL',
  'REST APIs',
  'GraphQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Git',
  'CI/CD',
  'Testing (Jest, Mocha)',
  'Microservices',
  'Debugging',
  'Object-Oriented Programming',
];



const getRandomProjects = () => {
  const randomCount = [1, 2, 4][Math.floor(Math.random() * 3)];
  const selectedProjects: string[] = [];
  
  while (selectedProjects.length < randomCount) {
    const randomProject = allProjects[Math.floor(Math.random() * allProjects.length)];
    if (!selectedProjects.includes(randomProject)) {
      selectedProjects.push(randomProject);
    }
  }
  return selectedProjects;
};

const seedData = async () => {
  try {
    await InternModel.deleteMany({});

    const interns: Array<{
      name: string;
      email: string;
      phone: string;
      college: string;
      course: string;
      skills: string[];
      startDate: Date;
      endDate: Date;
      projectAssigned: string[];
    }> = [];
    
    for (let i = 0; i < 20; i++) {
      interns.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        college: faker.company.name(),
        course: faker.helpers.arrayElement(['CS', 'IT', 'ECE']),
        skills: faker.helpers.arrayElements(sdeSkills, faker.number.int({ min: 5, max: 10 })),
        startDate: faker.date.past({ years: 2 }),
        endDate: faker.date.future({ years: 1 }),
        projectAssigned: getRandomProjects()
      });
    }

    await InternModel.insertMany(interns);
    console.log('Database seeded successfully!');
    mongoose.connection.close(); 
  } catch (err) {
    console.error('Error while seeding data: ', err);
    mongoose.connection.close();
  }
};

seedData();
