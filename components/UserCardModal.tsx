import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import Viewer from "react-viewer";

interface Types {
  props: {
    image: {
      url: "";
    };
    item: {
      title: "";
    };
  };
}

const UserCardModal: React.FC<Types["props"]> = ({ image, item }) => {
  const [visible, setVisible] = useState(false);
  const closeViewer = () => {
    setVisible(false);
  };
  console.log("image.url", image.url);
  const url = image.url;
  return (
    <>
      <div>
        <Box
          cursor="pointer"
          onClick={() => {
            setVisible(true);
          }}
        >
          <Image src={image?.url} alt={item?.title} borderRadius="lg" />
        </Box>
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={[{ src: image.url, alt: "" }]}
          // customToolbar={(toolbars) => {}}
          noToolbar={true}
          noFooter={true}
          onMaskClick={closeViewer}
        />
      </div>
    </>
  );
};

export default UserCardModal;
