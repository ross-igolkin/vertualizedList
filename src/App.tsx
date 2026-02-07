import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ListPanel from "./components/ListPanel";

const PANELS = [
  { title: "Users", endpoint: "/users" },
  { title: "Reviewers", endpoint: "/reviewers" },
] as const;

function App() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [activeTab, setActiveTab] = useState(0);

  if (isDesktop) {
    return (
      <Stack direction="row" spacing={3} padding={3} height="100vh">
        <Box flex={1} minWidth={0}>
          <ListPanel title="Users" endpoint="/users" />
        </Box>
        <Box flex={1} minWidth={0}>
          <ListPanel title="Reviewers" endpoint="/reviewers" />
        </Box>
      </Stack>
    );
  }

  return (
    <Stack height="100vh">
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {PANELS.map(({ endpoint, title }) => (
          <Tab key={endpoint} label={title} />
        ))}
      </Tabs>

      {/* Both panels stay mounted — display:none preserves scroll position and cached data */}
      {PANELS.map(({ endpoint, title }, index) => (
        <Box
          key={endpoint}
          flex={1}
          minHeight={0}
          padding={1.5}
          display={activeTab === index ? undefined : "none"}
        >
          <ListPanel title={title} endpoint={endpoint} />
        </Box>
      ))}
    </Stack>
  );
}

export default App;
