import "./Button.css";
import clsx from "clsx";

// function Button({ type, styleClass, label, redirectLink }) {
//   let styleClassesRed = clsx(
//     "bg-brandRed font-bold text-brandCream text-lg p-2.5 flex items-center justify-center",
//     styleClass
//   );
//   let styleClassesCream = clsx(
//     "bg-brandCream font-bold text-brandRed text-lg p-2.5 flex items-center justify-center",
//     styleClass
//   );
//   if (type === "red") {
//     return <button className={styleClassesRed} onClick={() => window.location.href = redirectLink} >{label}</button>;
//   }
//   if (type === "cream") {
//     return <button className={styleClassesCream} onClick={() => window.location.href = redirectLink}>{label}</button>;
//   }
// }

// export default Button;

import { Link } from "react-router-dom";

// function LoginButton({ label, type, styleClass, redirectLink, onClick }) {
//   const buttonElement = (
//     <button
//       className={
//         type === "red"
//           ? `bg-brandRed text-white font-bold rounded-lg ${styleClass}`
//           : `bg-brandCream text-brandRed font-bold rounded-lg ${styleClass}`
//       }
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );

//   // Only wrap with Link if there is no onClick handler (i.e., for "Login | Sign up")
//   return onClick ? buttonElement : <Link to={redirectLink}>{buttonElement}</Link>;
// }

// export default LoginButton;



import "./Button.css";


function Button({ type, styleClass, label, redirectLink, onClick }) {
  let styleClassesRed = clsx(
    "bg-brandRed font-bold text-brandCream text-lg p-2.5 flex items-center justify-center",
    styleClass
  );
  let styleClassesCream = clsx(
    "bg-brandCream font-bold text-brandRed text-lg p-2.5 flex items-center justify-center",
    styleClass
  );

  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute the onClick handler if provided (e.g., for logout)
    } else if (redirectLink) {
      window.location.href = redirectLink; // Fallback to redirectLink if no onClick
    }
  };

  if (type === "red") {
    return <button className={styleClassesRed} onClick={handleClick}>{label}</button>;
  }
  if (type === "cream") {
    return <button className={styleClassesCream} onClick={handleClick}>{label}</button>;
  }
}

export default Button;