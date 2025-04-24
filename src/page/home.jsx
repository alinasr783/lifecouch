import React from "react";
import "./home.css";
import A1Header from "../component/header/a2/a2";
import A1Landing from "../component/landing/a2/a2";
import A1Footer from "../component/footer/a4/a4"
import A1Plan from "../component/plan/a1/a1";
import A1About from "../component/about/a3/a3";
import A1Policy from "../component/police/a1/a1"
export default function Home() {
  return (
    <>
      <div className="home">
        <A1Header />
        <A1Landing />
        <A1Plan />
        <A1About />
        <A1Policy />
        <A1Footer />
      </div>
    </>
  );
}
