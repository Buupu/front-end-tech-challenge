import React, { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/layout";
import { getSearchResults } from "../api/Asset";
import { SearchCollectionModal } from "../modal/Asset";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const defaultCollection: SearchCollectionModal = {
  collection: {
    items: [],
    links: { href: "", rel: "" },
    metadata: { total_hits: 0 },
  },
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<SearchCollectionModal>(defaultCollection);

  const onSearch = async () => {
    const results = await getSearchResults(searchQuery);
    if (results.status === 200) {
      //would probably want to type check here
      const data: SearchCollectionModal = results.data as SearchCollectionModal;

      setSearchResults(data);
    } else {
      //handle some error
    }
  };
  return (
    <Box>
      <Heading>Search Page</Heading>
      <Box>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={onSearch}>Search</Button>
      </Box>
      <VStack>
        {searchResults.collection.items.map((asset) => {
          return (
            <Heading key={asset.data[0].nasa_id}>{asset.data[0].title}</Heading>
          );
        })}
      </VStack>
    </Box>
  );
}
