import { useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import BugReportIcon from "@mui/icons-material/BugReport";

interface DebugOverlayProps {
  renderedNodes: number;
  loadedItems: number;
  totalItems: number;
  visibleRange: [number, number];
  isFetching: boolean;
}

export default function DebugOverlay({
  renderedNodes,
  loadedItems,
  totalItems,
  visibleRange,
  isFetching,
}: DebugOverlayProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setOpen((o) => !o)}
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          zIndex: 10,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        <BugReportIcon fontSize="small" />
      </IconButton>

      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            zIndex: 10,
            p: 1,
            opacity: 0.9,
            fontSize: 11,
            fontFamily: "monospace",
            lineHeight: 1.6,
          }}
        >
          <div>DOM nodes: {renderedNodes}</div>
          <div>Loaded: {loadedItems}</div>
          <div>Total: {totalItems.toLocaleString()}</div>
          <div>Visible: {visibleRange[0]}–{visibleRange[1]}</div>
          {isFetching && <div style={{ color: "#ed6c02" }}>Fetching...</div>}
        </Paper>
      )}
    </>
  );
}
