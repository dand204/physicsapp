/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


//export default
 module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'physicsapp',
    meta: [{ charset: "utf-8" }]
  },
  loading: false,
  plugins: [
    
    
    
  ],
  buildModules: [
    
  ],
  modules: [
    '@nuxtjs/vuetify',

  ],
          vuetify: {
            theme: {
              themes: {
                options: {
                  customProperties: true,
                },
                light: {
                  primary: '#1867c0',
                  secondary: '#ff0000',
                  accent: '#8c9eff',
                  error: '#b71c1c',
                  searchcolor: '#24292e',
                  warning: '#b71c1c'

                },
              },
            }
          }
};
