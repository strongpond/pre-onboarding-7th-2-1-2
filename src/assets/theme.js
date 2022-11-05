const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const fontSizes = {
  title: "17px",
  subtitle: "14px",
  paragraph: "12px",
  detailTitle: "24px",
  detailSubtitle: "20px",
};

const colors = {
  black: "#000000",
  grey: "#D9D9D9",
  white: "#ffffff",
  skyblue: "#0094FF",
};

const theme = {
  common,
  fontSizes,
  colors,
};

export default theme;
