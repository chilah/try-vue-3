/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMeta {
  env: {
    BASE_URL: string;
    API_HOST: string;
    VUE_APP_API_HOST: string;
  };
}
