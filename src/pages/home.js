import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function TreeViewFile() {
  return (
    <>
      <div className="container mx-auto px-4 mt-50 flex justify-evenly flex-col md:flex-row w-screen m-3 flex-auto">
        <Card cardNumber="card1"></Card>
        <Card cardNumber="card2"></Card>
      </div>
    </>
  );
}
