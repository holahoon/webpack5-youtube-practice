import Recipes from "./Recipes";
import "../styles/index.scss";

const App = () => {
  return (
    <>
      <section className="hero">
        <main>
          <section>
            <h1>Oh hi there! this is from React</h1>
          </section>
        </main>

        <Recipes />
      </section>
    </>
  );
};

export default App;
