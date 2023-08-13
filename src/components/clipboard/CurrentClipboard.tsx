import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarButton from "../buttons/Starbutton";
import { Row, RowEvenlySpace } from "../wrappers/row";
import { Divider } from "../utility/divider";
import { ClipboardItemButton } from "./ClipboardItemButton";

export const CurrentClipboard = () => {
  // Call the rust backend to fetch the list of clipboard items

  // State to store the list items

  const [listItems, setListItems] = useState(["Test item 1", "test item 2"]);

  // Effect to load initial items
  useEffect(() => {
    console.log("Running effect for getting the clipboard data bero");
    invoke("get_clipboard_entries").then((data) => {
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

  //Function to save bookmarked items
  const handleBookmarkClick = (savedItem: string) => {
    console.log("Handling click on bookmark", savedItem);
    invoke("save_bookmark", { item: savedItem }).then(() => {
      console.log("Bookmark saved");
    });
  };

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    console.log("Scroll handler useEffect");
    console.log(window.innerWidth, window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const listItemClickHandler = async (item: string) => {
    await writeText(item);
  };

  return (
    <div>
      <ul style={{ listStyle: "none", margin: "0 20px 0 20px", padding: "0" }}>
        {listItems.map((item, index) => (
          <li key={index}>
            <RowEvenlySpace>
              <ClipboardItemButton
                onClick={() => {
                  listItemClickHandler(item);
                }}
                text={item}
              />

              <StarButton
                onClick={() => {
                  handleBookmarkClick(item);
                }}
              />
            </RowEvenlySpace>
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
};
