import { Box, AspectRatio, Img, Text, Icon, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AssetSearchResultModal } from "../modal/Asset";
import { BsSoundwave } from "react-icons/bs";

export const AssetSearchCard = ({
  asset,
}: {
  asset: AssetSearchResultModal;
}) => {
  const assetData = asset.data[0];
  return (
    <Link to={`/asset/${assetData?.nasa_id}`}>
      <Box
        key={assetData?.nasa_id}
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        transition="0.3s ease-out"
        h="100%"
        _hover={{ transform: "translateY(-10px)" }}
      >
        {assetData?.media_type === "image" && (
          <AspectRatio ratio={3 / 2} mb={2}>
            <Img src={asset.links[0]?.href} />
          </AspectRatio>
        )}
        {assetData?.media_type === "audio" && (
          <Flex pt={2} justify="center">
            <Icon as={BsSoundwave} fontSize={30} color="teal.500" />
          </Flex>
        )}
        <Text fontSize={14} p={2} textAlign="center">
          {assetData?.title}
        </Text>
      </Box>
    </Link>
  );
};
