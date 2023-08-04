import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RowEvenlySpace } from "../wrappers/row";
import { ClipboardItemButton } from "./ClipboardItemButton";
import { Divider } from "../utility/divider";

export const BookmarkClipboard = () => {
  // Call the rust backend to fetch the list of clipboard items

  // State to store the list items

  const [listItems, setListItems] = useState(["Test item 1", "test item 2"]);

  // Effect to load initial items
  useEffect(() => {
    console.log("Running effect for getting the clipboard data bero");
    invoke("get_bookmark_list").then((data) => {
      console.log(data);

      setListItems((data as Array<string>).reverse());
    });
  }, []);

  // Function to handle scrolling
  const handleScroll = () => {
    console.log("Dimensions : ");

    console.log(window.innerHeight, window.innerWidth);

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
            </RowEvenlySpace>
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
};
