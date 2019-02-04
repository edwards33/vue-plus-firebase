# vue-plus-firebase

Web page project is based on Vue.js and [Firebase](https://firebase.google.com/) as DB and Hosting provider.
[Vue.js](https://vuejs.org/) and [Vuetify.js](https://vuetifyjs.com/en/) were used in order to develop the app.

[Tailwind CSS](https://tailwindcss.com) is used as CSS framework.

[Link to App](https://vue-plus-firebase-71f43.firebaseapp.com)

## Project setup

```
npm install
```
__NOTE__: Before project setup you need to input data specific to your project on Firebase (please consult [Firebase](https://firebase.google.com/)) in the following files:
_App.vue_:
```
var config = {
      apiKey: "input-your-api-key",
      authDomain: "input-your-daomain",
      databaseURL: "input-link-to-your-db",
      projectId: "input-your-project-id",
      storageBucket: "input-your-storage-bucket",
      messagingSenderId: "input-your-msg-sende-id"
    }
```
_.firebaserc_:
```
{
  "projects":{
    "default" : "input-your-project-id"
  }
}
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
