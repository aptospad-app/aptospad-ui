import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import {createHtmlPlugin} from "vite-plugin-html";
import * as path from "path";
import svgrPlugin from "vite-plugin-svgr";

const config = async ({command, mode}): Promise<any> => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    "publicDir": "./public",
    "resolve": {
      "alias": [
        {
          "find": /~(.+)/,
          "replacement": path.join(process.cwd(), "node_modules/$1")
        },
        {
          "find": /@\//,
          "replacement": path.join(process.cwd(), "src/")
        }
      ]
    },
    "plugins": [
      react(),
      svgrPlugin({
        "svgrOptions": {
          "icon": true
        }
      }),
      createHtmlPlugin({
        "inject": {
          "data": {
            "title": mode === "production" ? "AptosPad" : `${mode.toUpperCase()}`
          }
        }
      })
    ],
    "server": {
      "open": true,
      "https": false,
      "port": env.PORT || 3000
    },
    "define": {
      "process.env": env // Để có thể dùng process.env giống như create-react-app (CRA)
    },
    "envPrefix": "REACT_APP",
    "build": {
      "sourcemap": true
    }
  };
};

export default defineConfig(config);
