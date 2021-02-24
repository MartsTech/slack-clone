import { Badge, createStyles, withStyles } from "@material-ui/core";

export const StatusBadge: React.FC = () => {
  const StyledBadge = withStyles(() =>
    createStyles({
      badge: {
        backgroundColor: "green",
        color: "green",
        "&::after": {
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "$ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  )(Badge);

  return <StyledBadge overlap="circle" variant="dot" />;
};
