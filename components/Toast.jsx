import { useToast, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CustomToast({ receivedPosition, receivedStatus, receivedTitle }) {
  const toast = useToast();
  // positions = ["top", "top-right", "top-left", "bottom", "bottom-right", "bottom-left"];
  //statuses = ["success", "error", "warning", "info"];
  const [holdSecound, setHoldSecound] = useState(true);
  useEffect(() => {
    setHoldSecound(false);
    setTimeout(() => {
      setHoldSecound(true);
    }, 100);
  }, []);
  return (
    <>
      {holdSecound && (
        <Wrap style={{ display: "none" }}>
          {toast({
            title: receivedTitle,
            position: receivedPosition,
            // isClosable: true,
            status: receivedStatus,
            duration: 700,
          })}
        </Wrap>
      )}
    </>
  );
}
