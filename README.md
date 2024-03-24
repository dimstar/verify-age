# AGE VERIFY

[![Netlify Status](https://api.netlify.com/api/v1/badges/44e335c7-7a0f-41a7-8909-ed0ef72cd22a/deploy-status)](https://app.netlify.com/sites/verify-age/deploys)

This is a script which controls an #AgeGate modal dialog element on a website. Ideas for the future, data id implemenation to control various constants set in the code today.

## Usage

you can include the script in a website like so.

```html
...
  <script defer src="https://verify-age.netlify.app/bundle.js"></script>

</body>
```

Thanks to git clone (sweetcoco)[https://github.com/sweetcoco/webpack-babel-boilerplate.git] for the boilerplate. ES6 with polyfill for async await, Webpack, dev server with hot-module-reloading. Spicy 🔥

## Install

```
git clone https://github.com/sweetcoco/webpack-babel-boilerplate.git your-app # change your-app to the name of your project
cd your-app
git remote remove origin
# edit the package.json, then continue on
npm install
npm run dev
```

## Build for prod

```
npm run build
```
