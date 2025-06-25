// import React from "react";

// import Logo from "../../assets/images/Logo.png"

// function NavigationBar() {
//   const [openNav, setOpenNav] = React.useState(false);

//   React.useEffect(() => {
//     // Close sidebar if window resized to large screen
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setOpenNav(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-24 bg-white justify-center shadow-lg z-40
//           transform transition-transform duration-300 ease-in-out
//           ${openNav ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:fixed lg:shadow-none
//           flex flex-col
//         `}
//       >
//         <div className="p-1 border-b">
//           <img src={Logo} className="w-[60px]" />
//         </div>
//         <nav className="flex flex-col p-4 space-y-2">
//           {/* Replace with your nav items */}
//           <a href="/" className="hover:bg-gray-100 p-2 rounded">Home</a>
//           <a href="/about" className="hover:bg-gray-100 p-2 rounded">About</a>
//           <a href="/contact" className="hover:bg-gray-100 p-2 rounded">Contact</a>
//         </nav>
//       </aside>

//       {/* Backdrop for small screens */}
//       {openNav && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
//           onClick={() => setOpenNav(false)}
//         />
//       )}

//       {/* Hamburger button for toggling sidebar on small screens */}
//       <button
//         className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-gray-100 rounded-md shadow-md"
//         onClick={() => setOpenNav(!openNav)}
//         aria-label="Toggle navigation"
//       >
//         {openNav ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         )}
//       </button>
//     </>
//   );
// }

// export default NavigationBar;

// 2Second
import React from "react";
import Logo from "../../assets/images/Logo.png";

function NavigationBar({ isLoggedIn, role }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    // Close sidebar if window resized to large screen
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardPath = role === "teacher" ? "/teacher-dashboard" : role === "student" ? "/student-dashboard" : null;
  const dashboardLabel = role === "teacher" ? "Teacher Board" : role === "student" ? "Student Board" : "";

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-24 bg-white justify-center shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${openNav ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:fixed lg:shadow-none
          flex flex-col
        `}
      >
        <div className="p-1 border-b">
          <img src={Logo} className="w-[60px]" alt="IELTS Coaching Logo" />
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="/" className="hover:bg-gray-100 p-2 rounded">Home</a>
          <a href="/about" className="hover:bg-gray-100 p-2 rounded">About</a>
          <a href="/contact" className="hover:bg-gray-100 p-2 rounded">Contact</a>
          {isLoggedIn && dashboardPath && (
            <a href={dashboardPath} className="hover:bg-gray-100 p-2 rounded">
              {dashboardLabel}
            </a>
          )}
        </nav>
      </aside>

      {/* Backdrop for small screens */}
      {openNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setOpenNav(false)}
        />
      )}

      {/* Hamburger button for toggling sidebar on small screens */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-gray-100 rounded-md shadow-md"
        onClick={() => setOpenNav(!openNav)}
        aria-label="Toggle navigation"
      >
        {openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </>
  );
}

export default NavigationBar;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavigationBar = ({ isLoggedIn, role, onLogout }) => {
//   return (
//     <nav className="bg-brandRed text-white p-4 flex justify-between items-center">
//       <div>
//         <Link to="/" className="text-xl font-bold">IELTS Coaching</Link>
//       </div>
//       <div className="flex space-x-4">
//         {isLoggedIn && role === 'student' && (
//           <Link to="/student-dashboard" className="hover:underline">Dashboard</Link>
//         )}
//         {isLoggedIn && role === 'teacher' && (
//           <Link to="/teacher-dashboard" className="hover:underline">Dashboard</Link>
//         )}
//         {isLoggedIn && role === 'admin' && (
//           <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
//         )}
//         {isLoggedIn ? (
//           <button
//             onClick={onLogout}
//             className="bg-white text-brandRed font-bold py-2 px-4 rounded-lg hover:bg-brandCream transition duration-150"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link to="/login" className="hover:underline">Login | Sign up</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavigationBar;