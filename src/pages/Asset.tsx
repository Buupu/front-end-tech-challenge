import React, { useEffect, useState } from "react";
import { Box, Heading, Img, Spinner, Text } from "@chakra-ui/react";
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
        const metaDataResults = await fetch(
          data?.collection?.items[data?.collection?.items?.length - 1].href,
        );
        const metaDataJson = await metaDataResults.json();
        console.log(metaDataJson);
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
    <Box>
      <Heading>Asset Page</Heading>
      {isLoadingResults ? (
        <Spinner />
      ) : (
        <Box>
          {assetInfo?.mediaType === "image" && (
            <Img src={assetInfo?.mediaUrl} />
          )}

          <Heading>{assetInfo?.title}</Heading>
          <Text>{assetInfo?.description}</Text>
        </Box>
      )}
    </Box>
  );
}
