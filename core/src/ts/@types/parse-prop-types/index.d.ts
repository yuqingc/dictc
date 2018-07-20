declare module "parse-prop-types" {
  const parsePropTypes: (component: React.Component) => {[propName: string]: any};
  export default parsePropTypes;
}
