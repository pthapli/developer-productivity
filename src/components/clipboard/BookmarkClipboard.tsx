import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { useState, useEffect } from "react";
import { RowEvenlySpace } from "../wrappers/row";
import { ClipboardItemButton } from "./ClipboardItemButton";
import { Divider } from "../utility/divider";

type TlistItem = { value: string; context: string };

export const BookmarkClipboard = () => {
  // Call the rust backend to fetch the list of clipboard items

  // State to store the list items
  const [listItems, setListItems] = useState([{ value: "test", context: "" }]);

  const [deleteItem, setDeleteItem] = useState(true);

  // Effect to load initial items
  useEffect(() => {
    console.log("Running effect for getting the clipboard data bero");
    invoke<Array<{ value: string; context: string }>>("get_bookmark_list").then(
      (data) => {
        console.log(data);
        // setListItems(data.map((item) => item.value));
        setListItems(data);
      }
    );
  }, [deleteItem]);

  const listItemClickHandler = async (item: string) => {
    await writeText(item);
  };

  const handleBookmarkDelete = async (item: TlistItem) => {
    invoke("delete_saved_bookmark", {
      item,
    }).then((data) => {
      setDeleteItem(!deleteItem);
    });
  };

  return (
    <div>
      <ul style={{ listStyle: "none", margin: "0 20px 0 20px", padding: "0" }}>
        {listItems.map((item, index) => (
          <li key={index}>
            <RowEvenlySpace>
              <ClipboardItemButton
                onClick={() => {
                  listItemClickHandler(item["value"]);
                }}
                text={item?.["value"]}
                context={item?.["context"]}
                allowHover={true}
              />
              <button
                onClick={() => {
                  handleBookmarkDelete(item);
                }}
              >
                delete
              </button>
            </RowEvenlySpace>
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
};
