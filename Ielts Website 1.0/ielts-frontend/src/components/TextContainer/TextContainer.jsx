import './TextContainer.css';
import clsx from "clsx";

function TextContainer({ type, styleClass, text }){
    let styleClassesRed = clsx(
        "bg-brandRed text-brandCream p-2.5 flex flex-col",
        styleClass
      );
      let styleClassesCream = clsx(
        "bg-brandCream text-brandRed p-2.5 flex flex-col",
        styleClass
      );
      if (type === "red") {
        return(
            <>
            <div className={styleClassesRed}>
                <p className='text-base'>{text}</p>
            </div>
            </>
        );
      }
      if (type === "cream") {
         return(
            <>
            <div className={styleClassesCream}>
                <p className='text-base p-[20px]'>{text}</p>
            </div>
            </>
        );
      }
}

export default TextContainer;