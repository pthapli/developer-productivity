import { invoke } from "@tauri-apps/api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ClipboardList = () => {
  // Call the rust backend to fetch the list of clipboard items

  // State to store the list items

  const [listItems, setListItems] = useState(["Test item 1", "test item 2"]);

  // // Effect to load initial items
  useEffect(() => {
    console.log("Running effect for getting the clipboard data bero");
    invoke("mister_clipper").then((data) => {
      console.log(data);

      setListItems((data as Array<string>).reverse());
    });
  }, []);

  // Function to handle scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // loadMoreItems();
    }
  };

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <ul>
        {listItems.map((item, index) => (
          <li
            key={index}
            onClick={() => console.log("List item clicked bero: ", item)}
          >
            {item}
          </li>
        ))}
      </ul>
      {console.log("Rendering...")}
      <button onClick={() => navigate("/")}>Go back</button>
    </div>
  );
};
