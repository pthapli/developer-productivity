import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ClipboardList = () => {
  // State to store the list items
  const [listItems, setListItems] = useState(["item 1", "item 2", "item 3"]);

  // State to track if more items can be loaded
  const [hasMore, setHasMore] = useState(true);

  // Function to simulate loading more items
  const loadMoreItems = () => {
    // Simulating an API call to fetch more items
    // Replace this with your actual data fetching logic
    setTimeout(() => {
      const newItems = [...listItems];
      // Generate new items, for example:
      for (let i = 0; i < 10; i++) {
        newItems.push(`Item ${newItems.length + 1}`);
      }

      setListItems(newItems);
      setHasMore(newItems.length < 50); // Stop loading more items after 50
    }, 1000);
  };

  // Effect to load initial items
  useEffect(() => {
    loadMoreItems();
  }, []);

  // Function to handle scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreItems();
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
          <li key={index}>{item}</li>
        ))}
      </ul>
      {hasMore && <p>Loading more items...</p>}
      <button onClick={() => navigate("/")}>Go back</button>
    </div>
  );
};
