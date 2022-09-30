import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";


const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 25,
    padding: "0 4px"
  }
}));

const CustomBadge = () => {
  const cartState = useSelector((state) => state.cart);


  return <StyledBadge badgeContent={cartState.products && cartState.products.length } color="error" />;
}

export default CustomBadge
