# Kings Code  scaffold

## Installation

```bash
vue create my-app
cd my-app
vue add vuetify
vue add kingscode-scaffold
npm run serve
```

Mind that some of the choices you make in the `vue create my-app` and 
later in the `vue add vuetify` will be overwritten by vuetify or the kings code scaffold.


## Configuration

```
Notice: it does not matter which choice you make with options that are not documented.
 ```

### Vue:
We'd recommend you to choose
- babel
- pwa
- router
- vuex
- css pre-processors

And then:

- history mode
- dart sass (very important, vuetify wont work without it)

The rest doesn't matter.

### Vuetify
Configure:
- Pre made templates will be overwritten, so keep it default
- Custom properties
- Font awesome 5 (this will be overwritten with font awesome pro)
- Use a-la-carte components
- Locale will be overwritten to dutch as default

### Kingscode scaffold
This is our own scaffold, which you can use with our laravel API you can answer the questions
as you like in this plugins. The most important choices are:

- Do you want to use a crud system?
    - This installs our vuetify resource and creates an implementation for this so the vuetify
    resource works with the connected laravel API
    - a example user resource
- Do you want to use authorisation?
    - This creates a login, password forgotten and invitation page
    - You'll get follow up questions about the Oauth settings from the API
