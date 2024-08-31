const mobileCardColor = (sortValue) => {
  if (sortValue === 4) {
    return "#31C48D";
  }
  if (sortValue === 3) {
    return "#84E1BC";
  }
  if (sortValue === 2) {
    return "#BCF0DA";
  }
  if (sortValue === 1) {
    return "#DEF7EC";
  }
  if (sortValue === 0) {
    return "#F3F4F6";
  }
  if (sortValue === -1) {
    return "#FDE8E8";
  }
  if (sortValue === -2) {
    return "#FBD5D5";
  }
  if (sortValue === -3) {
    return "#F8B4B4";
  }
  if (sortValue === -4) {
    return "#F98080";
  }
  return;
};

export default mobileCardColor;
