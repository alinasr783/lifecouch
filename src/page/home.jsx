import React from "react";
import "./home.css";
import A1Header from "../component/header/a1/a1";
import A1Landing from "../component/landing/a1/a1";
import A1Footer from "../component/footer/a2"
export default function Home() {
  return (
    <>
      <div className="home">
        <A1Header />
        <A1Landing />
        <A1Footer />
      </div>
    </>
  );
}
