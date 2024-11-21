declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.font.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const classes: string;
  export default classes;
}
