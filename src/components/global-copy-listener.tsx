import React, { useEffect } from "react";

const GlobalCopyListener = () => {
  useEffect(() => {
    const handleCopy = (event: any) => {
      // Perform your desired action here
      console.log("Text copied:", event.clipboardData.getData("text"));
      console.log("BERO ", event.clipboardData);
    };

    window.addEventListener("copy", handleCopy);

    // return () => {
    //   document.removeEventListener("copy", handleCopy);
    // };
  }, []);

  return null; // No need to render anything
};

export default GlobalCopyListener;
