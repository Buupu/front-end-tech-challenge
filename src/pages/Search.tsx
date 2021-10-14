import React, { useState } from "react";
import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/layout";
import { getSearchResults } from "../api/Asset";
import { SearchCollectionModal } from "../modal/Asset";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { RadioGroup, Radio } from "@chakra-ui/radio";
import { Icon, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { AssetSearchCard } from "../components/AssetSearchCard";

const defaultCollection: SearchCollectionModal = {
  collection: {
    items: [],
    links: { href: "", rel: "" },
    metadata: { total_hits: 0 },
  },
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mediaType, setMediaType] = useState<string>("image");
  const [searchResults, setSearchResults] =
    useState<SearchCollectionModal>(defaultCollection);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);

  const onSearch = async () => {
    setIsLoadingResults(true);

    //should try catch here
    const results = await getSearchResults(searchQuery, mediaType);
    if (results.status === 200) {
      //would probably want to type check here
      const data: SearchCollectionModal = results.data as SearchCollectionModal;

      setSearchResults(data);
    } else {
      //handle some error
    }
    setIsLoadingResults(false);
  };

  return (
    <Box maxW="container.xl" margin="auto" px={4}>
      <Flex direction="column" alignItems="center" pt={20}>
        <InputGroup maxW="600px" mb={6} size="lg">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search.."
            borderRadius="full"
          />
          <InputRightElement
            children={
              <Button
                onClick={onSearch}
                isLoading={isLoadingResults}
                maxW="40px"
                maxH="40px"
                w="100%"
                h="100%"
                borderRadius="full"
                colorScheme="teal"
              >
                <Icon as={AiOutlineSearch} color="white" fontSize={24} />
              </Button>
            }
          />
        </InputGroup>

        <RadioGroup onChange={(e) => setMediaType(e)} value={mediaType}>
          <Stack direction="row" spacing={10}>
            <Radio value="image" size="lg">
              Image
            </Radio>
            <Radio value="audio" size="lg">
              Audio
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      {isLoadingResults ? (
        <Flex justify="center" p={20}>
          <Spinner />
        </Flex>
      ) : (
        <SimpleGrid columns={[2, 3, 4, 5]} gap={4} py={20}>
          {searchResults.collection?.items?.map((asset) => {
            return (
              <AssetSearchCard key={asset.data[0].nasa_id} asset={asset} />
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}
