import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function ListItemSkeleton() {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
        title={<Skeleton animation="wave" variant="text" width="50%" />}
        subheader={<Skeleton animation="wave" variant="text" width="65%" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Skeleton animation="wave" variant="text" width="40%" />
        <Skeleton animation="wave" variant="text" width="90%" />
        <Skeleton animation="wave" variant="text" width="75%" />
      </CardContent>
    </Card>
  );
}
