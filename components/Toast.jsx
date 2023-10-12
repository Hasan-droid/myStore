import { useToast, Wrap, WrapItem } from "@chakra-ui/react";

export default function CustomToast({ receivedPosition, receivedStatus, receivedTitle }) {
  const toast = useToast();
  // positions = ["top", "top-right", "top-left", "bottom", "bottom-right", "bottom-left"];
  //statuses = ["success", "error", "warning", "info"];
  return (
    <Wrap style={{ display: "none" }}>
      {toast({
        title: receivedTitle,
        position: receivedPosition,
        // isClosable: true,
        status: receivedStatus,
      })}
    </Wrap>
  );
}
