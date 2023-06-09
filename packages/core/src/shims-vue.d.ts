declare module 'markdown-it-image'
declare module 'markdown-it-sup'
declare module 'markdown-it-sub'
declare module 'markdown-it-ins'
declare module 'markdown-it-br'
declare module 'markdown-it-mark'
declare module 'markdown-it-katex-external'
declare module 'markdown-it-deflist'
declare module 'markdown-it-images-preview'
declare module 'markdown-it-link-attributes'
declare module 'vue-affix'
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}