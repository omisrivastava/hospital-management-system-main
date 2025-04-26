import React, { useContext } from "react";
import Hero from "../Components/Hero";
import Biography from "../Components/Biography";
import MessageForm from "../Components/MessageForm";
import Departments from "../Components/Departments";

const Home = () => {
  return (
    <div>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
