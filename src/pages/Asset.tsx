import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Img, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getAsset } from "../api/Asset";
import { AssetModal, AssetResponseModal } from "../modal/Asset";

export default function AssetPage() {
  const { assetId } = useParams<{ assetId: string }>();
  const [assetInfo, setAssetInfo] = useState<AssetModal>();
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>();

  useEffect(() => {
    const callApi = async () => {
      setIsLoadingResults(true);
      const results = await getAsset(assetId);

      if (results.status === 200) {
        const data: AssetResponseModal = results.data as AssetResponseModal;

        //assuming last index in array is always metadata link
        const metaDataResults = await fetch(
          data?.collection?.items[data?.collection?.items?.length - 1].href,
        );
        const metaDataJson = await metaDataResults.json();

        //media url should be handled better and depend on media type
        setAssetInfo({
          title: metaDataJson["XMP:Title"],
          description: metaDataJson["XMP:Description"],
          mediaType: metaDataJson["AVAIL:MediaType"],
          mediaUrl: data?.collection?.items[2]?.href,
        });
      } else {
        //handle some error
      }
      setIsLoadingResults(false);
    };

    callApi();
  }, [assetId]);
  return (
    <Box maxW="container.xl" margin="auto" p={20}>
      {isLoadingResults ? (
        <Flex p={20} justify="center">
          <Spinner />
        </Flex>
      ) : (
        <Box textAlign="center">
          <Heading as="h1">
            {assetInfo?.title || "Couldn't find the title.."}
          </Heading>
          <Text pb={4}>{assetInfo?.description}</Text>
          {assetInfo?.mediaType === "image" && (
            <Img src={assetInfo?.mediaUrl} maxH="500px" margin="auto" />
          )}
        </Box>
      )}
    </Box>
  );
}
