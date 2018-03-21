# nuxt-custom-headers
[Nuxt](https://nuxtjs.org) module to add custom headers to SSR rendered pages.

## Setup

* Add the nuxt-custom-headers package to your dependencies with npm or yarn:

```bash
# With npm
npm install nuxt-custom-headers --save
# With yarn
yarn add nuxt-custom-headers
```

* Add the module to your ```nuxt.config.js```:

```javascript
{
  modules: [
    // Simple usage, headers function name is 'httpHeaders' by default
    'nuxt-custom-headers',

    // With custom headers function name (in case of function name collision with another module)
    ['nuxt-custom-headers', { functionName: 'myCustomFunctionName' }],
  ]
}
```

> **Note**: you can also override the ```functionName``` parameter with the ```NUXT_CUSTOM_HEADERS_FUNCTION``` environment variable.

## Add headers to your pages

To add headers to a page, you need to implement a ```headers``` function in the page component.
This function must return a list of headers.

Example:

```javascript
<template>
  <div>
    <p>This is an awesome page</p>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  httpHeaders: () => ({
    'Cache-Control': 'max-age=60, s-maxage=90, public',
    'X-My-Header': 'Anything you could need'
  })
}
</script>
```


Enjoy.
