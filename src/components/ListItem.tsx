import { memo } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { ListItem as ListItemType } from "@/api/types";

interface ListItemProps {
  item: ListItemType;
}

const ListItem = memo(function ListItem({ item }: ListItemProps) {
  // Memo verification — uncomment to test in console:
  // const mountRef = useRef(false);
  // useEffect(() => { mountRef.current = true; }, []);
  // console.log("ListItem", mountRef.current ? "RE-RENDER" : "MOUNT", item.firstName);

  const { firstName, lastName, email, catchPhrase, comments } = item;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {firstName[0]}
            {lastName[0]}
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        subheader={email}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant="body2" color="primary" fontStyle="italic">
          {catchPhrase}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {comments}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default ListItem;
