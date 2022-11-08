require("@babel/register")({
  "presets": ["@babel/preset-env", "@babel/preset-react"]
});

const Routes = require("./Routes").default;
const Sitemap = require("react-router-sitemap").default;

const filterConfig = {
  "isValid": false,
  "rules": [
    /\/auth/,
    /\*/
  ]
};

const paramsConfig = {
  "/launchpad/:id": [
    {"id": "first-launchpad"},
    {"id": "second-launchpad"},
    {"id": ["third-launchpad", "fourth-launchpad"]}
  ]
};

(
  new Sitemap(Routes)
    .filterPaths(filterConfig)
    .applyParams(paramsConfig)
    .build("https://aptospad.app", {"limitCountPaths": 5000})
    .save("public/sitemap.xml")
);
