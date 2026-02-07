import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface StatusStateProps {
  icon: ReactNode;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  actionColor?: "primary" | "error" | "inherit";
}

export default function StatusState({
  icon,
  message,
  actionLabel,
  onAction,
  actionColor = "primary",
}: StatusStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" spacing={1.5}>
      {icon}
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="outlined" color={actionColor} size="small" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Stack>
  );
}
