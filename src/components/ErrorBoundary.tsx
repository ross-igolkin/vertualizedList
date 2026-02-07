import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StatusState from "./StatusState";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <StatusState
          icon={<ErrorOutlineIcon sx={{ fontSize: 56, color: "error.main" }} />}
          message="Oops, something went wrong"
          actionLabel="Reload"
          actionColor="error"
          onAction={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}
