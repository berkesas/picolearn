module.exports = {
  packagerConfig: {
    ignore: [
      "^/.git$",
      "^/data$",
      "^/raw$",
      "^/books1$",
      "^/public$",
      "^/src$",
      "^/[.]browserslistrc$",
      "^/[.]editorconfig$",
      "^/tsconfig[.]json$",
      "[.](cmd|user|DotSettings|njsproj|sln)$",
    ],
    icon: "public/favicon.ico"
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "build/favicon.ico",
      },
    },
  ],
};
/*
,
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
    */
