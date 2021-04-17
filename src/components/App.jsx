import Recipes from "./Recipes";

import "../styles/index.scss";
import swordImg from "../images/swc-sword.png";
import swordSvg from "../images/sword.svg";

const App = () => {
  return (
    <>
      <section className="hero">
        <main>
          <section>
            <h1>Oh hi there! from Reactttttt!</h1>
          </section>

          <img src={swordImg} alt="sword" width="250" />
          <img src={swordSvg} alt="sword svg" width="250" />

          <Recipes />
        </main>
      </section>
    </>
  );
};

export default App;
