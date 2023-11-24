import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import Viewer from "react-viewer";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useNavigate } from "react-router-dom";
import { NavigationType, useNavigationType } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";

interface Types {
  props: {
    image: {
      url: "";
      length: number;
    };
    item: {
      title: "";
    };
  };
}

const UserCardModal: React.FC<Types["props"]> = ({ image, item }) => {
  console.log("image.url", image);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        cursor="pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Image src={image[0]?.url} alt={item?.title} borderRadius="lg" />
      </Box>
      <Lightbox
        open={open}
        close={() => {
          setOpen(false);
        }}
        slides={[
          {
            src: image[0]?.url,
          },
        ]}
        plugins={[Zoom]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 2,
          wheelZoomDistanceFactor: 200,
          doubleClickDelay: 300,
        }}
        animation={{ zoom: 500 }}
        carousel={{ finite: image.length <= 1 }}
        render={{
          buttonPrev: image.length <= 1 ? () => null : undefined,
          buttonNext: image.length <= 1 ? () => null : undefined,
        }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </>
  );
};

export default UserCardModal;
