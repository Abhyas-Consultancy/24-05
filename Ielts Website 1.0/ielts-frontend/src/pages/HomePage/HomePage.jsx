// import "./HomePage.css";

// import HomePageHeaderImage from "../../components/HomePageHeaderImage";
// import HeaderText from "../../components/HeaderText";
// import JourneyCardCrousel from "../../components/JourneyCardCrousel";
// import TextContainer from "../../components/TextContainer";
// import FourGridHover from "../../components/FourGridHover";

// import HeaderImage from "../../assets/images/Header.png";

// function HomePage() {
//   let FourGridHoverCourseContent = [
//     {
//       title: "Listenting",
//       description:
//         "Develop active listening skills with authentic IELTS recordings. Learn strategies to follow conversations, lectures, and interviews effectively. Get trained on different accents and question formats. Practice note-taking and prediction techniques. Boost your accuracy and concentration under timed conditions.",
//     },
//     {
//       title: "Reading",
//       description:
//         "Our IELTS Reading course helps you master skimming, scanning, and critical reading techniques. Learn how to tackle different question types efficiently. Practice with real exam-style passages. Improve your vocabulary and time management. Gain confidence to score high in both Academic and General Training modules.",
//     },
//     {
//       title: "Speaking",
//       description:
//         "Build fluency and confidence with regular mock speaking tests. Learn how to answer all three parts of the IELTS Speaking module. Improve pronunciation, vocabulary, and grammatical range. Receive individual feedback and tips for self-improvement. Get comfortable speaking on various everyday and abstract topics.",
//     },
//     {
//       title: "Writing",
//       description:
//         "Our Writing course covers both Task 1 and Task 2 for Academic and General Training. Learn how to structure essays and reports with coherence and cohesion. Improve grammar, vocabulary, and argument development. Get personalized feedback on your writing. Practice regularly to achieve your target band score.",
//     },
//   ];
//   return (
//     <>
//       {/* Banner */}
//       <div>
//         <HomePageHeaderImage />
//       </div>
//       <div className="bg-brandCream mt-[20px]">
//         <HeaderText></HeaderText>
//       </div>
//       {/* Joureny Carousel */}
//       <JourneyCardCrousel></JourneyCardCrousel>
//       {/* Courses */}
//       <div className="courseDiv">
//         <p className="text-brandRed text-5xl font-extrabold self-end flex flex-row-reverse">
//           Our Courses
//         </p>
//         <TextContainer
//           type="cream"
//           text="We provide multiple courses that will help you get ready for IELTS. The courses are integrated with AI to help you analyze yourself with the updated technology.Our IELTS course is designed to help you master all four essential skills — Speaking, Listening, Reading, and Writing.Through targeted lessons, real exam practice, and expert feedback, we prepare you to confidently tackle each part of the test and achieve your desired band score.Whether you are aiming to study abroad or build a global career, our program will give you the strategies and skills you need to succeed."
//           styleClass="my-[20px]"
//         />
//         <FourGridHover contents={FourGridHoverCourseContent} />
//       </div>
//     </>
//   );
// }

// export default HomePage;


// import "./HomePage.css";
// import { Link } from "react-router-dom";
// import HomePageHeaderImage from "../../components/HomePageHeaderImage";
// import HeaderText from "../../components/HeaderText";
// import JourneyCardCrousel from "../../components/JourneyCardCrousel";
// import TextContainer from "../../components/TextContainer";
// import FourGridHover from "../../components/FourGridHover";

// function HomePage() {
//   const FourGridHoverCourseContent = [
//     {
//       title: "Listening",
//       description:
//         "Develop active listening skills with authentic IELTS recordings. Learn strategies to follow conversations, lectures, and interviews effectively. Get trained on different accents and question formats. Practice note-taking and prediction techniques. Boost your accuracy and concentration under timed conditions.",
//       link: "/skill-content/listening",
//     },
//     {
//       title: "Reading",
//       description:
//         "Our IELTS Reading course helps you master skimming, scanning, and critical reading techniques. Learn how to tackle different question types efficiently. Practice with real exam-style passages. Improve your vocabulary and time management. Gain confidence to score high in both Academic and General Training modules.",
//       link: "/skill-content/reading",
//     },
//     {
//       title: "Speaking",
//       description:
//         "Build fluency and confidence with regular mock speaking tests. Learn how to answer all three parts of the IELTS Speaking module. Improve pronunciation, vocabulary, and grammatical range. Receive individual feedback and tips for self-improvement. Get comfortable speaking on various everyday and abstract topics.",
//       link: "/skill-content/speaking",
//     },
//     {
//       title: "Writing",
//       description:
//         "Our Writing course covers both Task 1 and Task 2 for Academic and General Training. Learn how to structure essays and reports with coherence and cohesion. Improve grammar, vocabulary, and argument development. Get personalized feedback on your writing. Practice regularly to achieve your target band score.",
//       link: "/skill-content/writing",
//     },
//   ];

//   const role = JSON.parse(localStorage.getItem('user'))?.role || localStorage.getItem('role');
//   const isStudent = role === 'student';

//   return (
//     <>
//       <div>
//         <HomePageHeaderImage />
//       </div>
//       <div className="bg-brandCream mt-[20px]">
//         <HeaderText />
//       </div>
//       <JourneyCardCrousel />
//       <div className="courseDiv">
//         <p className="text-brandRed text-5xl font-extrabold self-end flex flex-row-reverse">
//           Our Courses
//         </p>
//         <TextContainer
//           type="cream"
//           text="We provide multiple courses that will help you get ready for IELTS. The courses are integrated with AI to help you analyze yourself with the updated technology. Our IELTS course is designed to help you master all four essential skills — Speaking, Listening, Reading, and Writing. Through targeted lessons, real exam practice, and expert feedback, we prepare you to confidently tackle each part of the test and achieve your desired band score. Whether you are aiming to study abroad or build a global career, our program will give you the strategies and skills you need to succeed."
//           styleClass="my-[20px]"
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {FourGridHoverCourseContent.map((content) => (
//             <div key={content.title} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-150">
//               <h3 className="text-brandRed text-xl font-bold mb-2">{content.title}</h3>
//               <p className="text-gray-600 mb-4">{content.description}</p>
//               {isStudent ? (
//                 <Link
//                   to={content.link}
//                   className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                 >
//                   Explore {content.title}
//                 </Link>
//               ) : (
//                 <p className="text-gray-500">Log in as a student to explore this skill.</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage;


import "./HomePage.css";

import HomePageHeaderImage from "../../components/HomePageHeaderImage";
import HeaderText from "../../components/HeaderText";
import JourneyCardCrousel from "../../components/JourneyCardCrousel";
import TextContainer from "../../components/TextContainer";
import FourGridHover from "../../components/FourGridHover";
// import Achievements from "../../components/Achievements";

import { Link } from "react-router-dom";

function HomePage() {
  const FourGridHoverCourseContent = [
    {
      title: "Listening",
      description:
        "Develop active listening skills with authentic IELTS recordings. Learn strategies to follow conversations, lectures, and interviews effectively. Practice note-taking and prediction techniques. Boost your accuracy and concentration under timed conditions.",
    },
    {
      title: "Reading",
      description:
        "Master skimming, scanning, and critical reading techniques. Learn how to tackle different question types efficiently. Improve vocabulary and time management for both Academic and General Training modules.",
    },
    {
      title: "Speaking",
      description:
        "Build fluency and confidence with regular mock speaking tests. Improve pronunciation, vocabulary, and grammatical range. Receive individual feedback and get comfortable speaking on various topics.",
    },
    {
      title: "Writing",
      description:
        "Covers both Task 1 and Task 2 for Academic and General Training. Learn how to structure essays and reports with coherence and cohesion. Improve grammar and vocabulary. Get personalized feedback on your writing.",
    },
  ];

  return (
    <>
      {/* Banner */}
      <HomePageHeaderImage />

      <div className="bg-brandCream mt-[20px]">
        <HeaderText />
      </div>

      {/* Journey Carousel */}
      <JourneyCardCrousel />

      {/* Courses */}
      <div className="courseDiv p-6">
        <p className="text-brandRed text-5xl font-extrabold text-right">
          Our Courses
        </p>
        <TextContainer
          type="cream"
          text="We provide multiple courses that will help you get ready for IELTS. The courses are integrated with AI to help you analyze yourself with the updated technology. Our IELTS course is designed to help you master all four essential skills — Speaking, Listening, Reading, and Writing."
          styleClass="my-[20px]"
        />
        <FourGridHover contents={FourGridHoverCourseContent} />

        {/* 🚀 Demo Button */}
        <div className="mt-8 flex justify-center">
          <Link to="/demo">
            <button className="bg-brandRed text-white px-6 py-3 rounded-xl text-lg hover:bg-red-700 transition-all">
              Try Demo Course
            </button>
          </Link>
        </div>
      </div>


    </>
  );
}

export default HomePage;
