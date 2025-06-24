import "./HeaderText.css";
import Button from "../Button/Button";

function HeaderText() {
  return (
    <>
      <div className="headerTextOuter">
        <p className="xl:text-5xl text-3xl text-brandRed font-extrabold">
          Empowering your <br />
          education
        </p>
        <p className="text-base text-brandRed font-semibold">
          Unlock your potential with our diverse range of courses and supportive
          learning environment.
        </p>
        <Button
          label="Start your journey now"
          type="red"
          styleClass="w-64 mr-5 w-346 h-auto p-2 my-5 transition duration-150 ease-in-out"
        />
      </div>
    </>
  );
}

export default HeaderText;
