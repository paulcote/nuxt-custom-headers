/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import middleware from "@@/.nuxt/middleware";

middleware["nuxt-custom-headers"] = async context => {
  if (process.server) {
    const headers = await [].concat
      .apply(
        [],
        context.route.matched.map(({ components }) => Object.values(components))
      )
      .reduce(async (previousPromise, component) => {
        const headers = await previousPromise;
        const layoutName = component.options.layout;
        const layoutComponent = await context.app.methods.loadLayout(
          layoutName
        );
        if (
          layoutComponent &&
          layoutComponent[context.env.NUXT_CUSTOM_HEADERS_FUNCTION]
        ) {
          Object.assign(
            headers,
            layoutComponent[context.env.NUXT_CUSTOM_HEADERS_FUNCTION](context)
          );
        }
        if (
          component.options &&
          component.options[context.env.NUXT_CUSTOM_HEADERS_FUNCTION]
        ) {
          Object.assign(
            headers,
            component.options[context.env.NUXT_CUSTOM_HEADERS_FUNCTION](context)
          );
        }

        return headers;
      }, {});

    Object.keys(headers).map(function(header) {
      context.res.setHeader(header, headers[header]);
    });
  }
};
