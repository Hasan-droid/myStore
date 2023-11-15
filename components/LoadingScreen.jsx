import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function LoadingScreen({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          className="toto"
          style={{
            // filter: isLoading ? "blur(4px)" : "none",
            backgroundColor: isLoading ? "rgba(255, 255, 255, 0.5)" : null,
            // position: "relative",
            zIndex: 5,
            position: "absolute", // Position the spinner within the form
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%", // Required for overlaying the spinner // Required for overlaying the spinner// Required for overlaying the spinner
          }}
        >
          <Spinner
            position="absolute"
            zIndex={100}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"

            // Center the spinner
          />
        </div>
      )}
    </>
  );
}
