import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import React from "react";

interface ICustomTabs {
  tablists: any[];
  tabPanel: any[];
}

const CustomTabs = ({ tablists, tabPanel }: ICustomTabs) => {
  return (
    <Tabs variant="unstyled">
      <TabList _focus={{ outline: "none" }} borderBottom="1px solid #EBECF0">
        {tablists?.map((tabList: any) => (
          <Tab
            _selected={{
              color: "#207DF7",
              fontSize: "1rem",
            }}
            key={tabList?.id}
          >
            {tabList?.title}
          </Tab>
        ))}
      </TabList>
      <TabIndicator top="181px" height="5px" bg="#207DF7" borderRadius="10px" />
      <TabPanels>
        {tabPanel?.map((tabPanel: any) => (
          <TabPanel padding={"0"} key={tabPanel?.id}>
            {tabPanel.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CustomTabs;
