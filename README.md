# Picolearn

## About

This is a desktop application for sharing HTML based learning resources.

## How does it work?

The main idea is that there are so many tiny HTML applets that can be converted to learning resource packages. This application is part of the framework that enables sharing learning resources.

- Learning resource packages are packaged into .OER extension packages
- Picolearn adds the packages and installs them in the application folder
- Learning resource packages can be opened and used in Picolearn application window

## Technology

- Desktop application shell built with [Electron](https://www.electronjs.org/)
- Web application built with [React](https://react.dev/)
- Styling with [Bootstrap](https://getbootstrap.com/)
- Packaging and distributing with [Electron Forge](https://www.electronforge.io/)

## Installation

To use the application you need to download and compile the application 

```shell
git clone https://github.com/berkesas/picolearn.git
cd picolearn
npm run build
npm run make
cd out
```

The installation files will be in /out folder. You can run picolearn.exe to run the application.

## Features

- For now works only on Windows.
- Add/remove learning resource packages
- Search packages

## Roadmap

- Preload sample packages
- Categorization of packages
- Add support Mac, Linux
