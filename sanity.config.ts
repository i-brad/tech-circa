import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { deskTool } from "sanity/desk";
import {
  dataset,
  previewSecretId,
  projectId
} from "./lib/sanity/config";
import {
  pageStructure,
  singletonPlugin
} from "./lib/sanity/plugins/settings";
import { schemaTypes } from "./lib/sanity/schemas";
import settings from "./lib/sanity/schemas/settings";

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = ["post"];
console.log(projectId);

export default defineConfig({
  name: "default",
  title: "Tech Circa",
  basePath: "/studio",
  projectId: projectId,
  dataset: dataset,

  plugins: [
    deskTool({
      structure: pageStructure([settings])
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    singletonPlugin(["settings"]),
    visionTool(),
    unsplashImageAsset(),
    table(),
    codeInput()
  ],

  schema: {
    types: schemaTypes
  }
});
