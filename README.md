# Return Order Management

Return Order Management frontend built with *Angular*. This is the client side application of the [return_order_management_backend](https://github.com/RitamChakraborty/return_order_management_backend) application. 

### UI

For the UI, [Angular Material](https://material.angular.io/) and [SCSS](https://sass-lang.com/) was used. The application is fully responsive.

### Demo

![demo](./.screenshots/demo.gif)

### Running Locally

Must have *Node 16* or above and *Angular CLI* installed. Make sure to update the [environments.ts](./src/environments/environment.ts) file to pass the correct API gateway url. 

```sh
ng serve
```

Visit [localhost:4200](http://localhost:4200) to see the application running. 

### Deploy

The website is deployed to github pages through [gh-pages](https://github.com/tschaub/gh-pages) npm package.

Checkout it out [here](https://ritamchakraborty.github.io/return_order_management_frontend/).