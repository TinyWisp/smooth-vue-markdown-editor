<template>
  <div class="container">
    <smooth-markdown v-model="doc" mode="editor|viewer|toc" :locale="locale" :plugins="plugins" ref="sm">
      <template v-slot:toolbar>
        <vuetify-toolbar></vuetify-toolbar>
      </template>
    </smooth-markdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'
import { SmoothMarkdown } from '@smooth-markdown/core'
import { langEn, langZhCN, injectCss, codemirrorExt, highlightCodeBlockInEditableArea, overlayScrollbars, customCodeBlockRenderer, syncScrollbar, math, tocSpy } from '@smooth-markdown/core/plugins'
import { CodeMirrorRenderer, KatexRenderer, MermaidRenderer } from '@smooth-markdown/core/renderers'
import VuetifyToolbar from '@smooth-markdown/vuetify-toolbar'
import { EditorView } from '@codemirror/view'
import { githubLightInit } from '@uiw/codemirror-theme-github'
import { tags as t } from '@lezer/highlight'
import { basicMarkdownSyntax } from './presets/basicMarkdownSyntax'

const doc = ref('')
const locale = ref('en')
setTimeout(() => {
  locale.value = 'zh_CN'
}, 5000)
const plugins = [
  langEn(),
  langZhCN(),
  ...basicMarkdownSyntax,
  math(),
  syncScrollbar(),
  customCodeBlockRenderer({
    math: [KatexRenderer],
    mermaid: [MermaidRenderer],
    default: [CodeMirrorRenderer]
  }),
  codemirrorExt(EditorView.lineWrapping),
  codemirrorExt(githubLightInit({
    settings: {
      lineHighlight: '#efefef',
      fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace'
    },
    styles: [
      {tag: t.heading, color: 'steelblue', fontWeight: 'bold'},
      {tag: t.list, color: '#0055aa'},
      {tag: t.meta, color: 'sienna'},
      {tag: t.url, color: '#090'},
      {tag: t.quote, color: '#090'},
      {tag: t.monospace, color: 'sienna'}
    ]
  })),
  highlightCodeBlockInEditableArea(),
  overlayScrollbars(),
  tocSpy(),
  injectCss(`&root { font-size: 14px; }`),
  injectCss(`&editor .cm-line { line-height: 1.5; } &editor .cm-editor { padding: 10px; }`),
  injectCss(`
    &root .os-scrollbar {
      transition: width 0.2s, opacity 0.2s, visibility 0.2s;
      --os-handle-bg: steelblue;
      --os-handle-bg-hover: steelblue;
      --os-handle-bg-active: steelblue;
    }
    &root .os-scrollbar:hover {
      --os-size: 12px;
      background-color: #f0f0f0;
      opacity: 0.9;
    }
  `),
  injectCss(`
    &viewer {
      padding: 16px 23px;
      text-wrap: wrap;
      word-break: break-word;
      font-size: 16px;
      line-height: 1.5;
    }
    &viewer table {
      border-spacing: 0;
      width: auto;
      overflow: auto;
      word-break: normal;
      word-break: keep-all;
      margin: 1.75em 0;
      border: 1px solid teal;
      border-radius: 0.45em;
      border-collapse: separate;
      overflow: hidden;
    }

    &viewer table th {
      background-color: #eaf3f3;
      color: teal;
      font-weight: bold;
      text-align: left;
    }

    &viewer td, th {
      padding: 0.5em 1em;
      border: 0;
      height: 2em;
      min-width: 4em;
    }

    &viewer tr:nth-child(2n) {
      background-color: #0000000d;
    }

    &viewer tr td:not(:last-child) {
      border-right: 1px solid lightgray;
    }

    &viewer tr th:not(:last-child) {
      border-right: 1px solid lightgray;
    }

    &viewer tr:hover td {
      background-color: #eaf3f3;
    }

    &viewer img {
      max-width: 100%;
    }

    &viewer img.emoji {
      display: inline;
      border: 0;
      width: 1em;
      height: 1em;
      padding: 0;
      margin: 0;
    }

    &viewer a {
      color: teal;
      font-weight: 600;
      text-decoration: none;
    }

    &viewer a:hover {
      text-decoration: underline;
    }

    &viewer a > code {
      color: #476582;
      text-decoration: none;
    }

    &viewer p > code {
      color: saddlebrown;
      background-color: #f1f1f1;
      padding: 0 0.5em;
      border-radius: 4px;
    }

    &viewer p {
      line-height: 1.6em;
      letter-spacing: 0.2px;
    }

    &viewer strong {
      color: saddlebrown;
      font-weight: bold;
    }

    &viewer mark {
      padding: 0.15em 0.5em;
    }

    &viewer blockquote {
      margin: 2em 0;
      padding-left: 20px;
      border-left: 4px solid teal;
      white-space: nowrap;
      color: #57606a;
    }

    &viewer ul {
      margin: 0.5em 0;
      padding-left: 2em;
      list-style: disc;
    }

    &viewer li + li {
      margin-top: 0.25em;
    }

    &viewer ul.contains-task-list {
      list-style: none;
    }
    &viewer .task-list-item-checkbox {
      vertical-align: middle;
      display: inline-block;
    }

    &viewer ol {
      padding-left: 1.25em;
    }

    &viewer h1 {
      margin: 0 0 3rem;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: 600;
      padding-bottom: 0.7em;
      border-bottom: 1px solid #d8dee4;
      width: 100%;
    }

    &viewer h2 {
      font-size: 1.5em;
      font-weight: 600;
      margin: 2.8em 0 0.8em;
      padding-bottom: 0.7em;
      border-bottom: 1px solid #d8dee4;
      width: 100%;
    }

    &viewer h3 {
      font-size: 1.2em;
      font-weight: 600;
      margin: 3rem 0 1.25rem 0;
    }

    &viewer h4 {
      font-size: 1em;
      margin: 1em 0;
    }

    &viewer h5 {
      font-size: 0.85em;
      margin: 1em 0;
    }

    &viewer h6 {
      font-size: 0.7em;
      margin: 1em 0;
    }

    &viewer hr {
      margin: 1.5em 0;
      width: 100%;
    }

    &viewer .nothing {
      display: none;
    }

    &viewer p, ul, ol, summary {
      margin-bottom: 1.2em;
    }

    &viewer blockquote > p {
      text-wrap: wrap;
      margin-bottom: 0;
    }

    &viewer pre {
      display: block;
      width: 100%;
      height: auto;
      position: relative;
    }
  `)
]

const smd: Ref<SmoothMarkdown | null> = ref(null)
onMounted(() => {
  console.log(smd.value?.getContext())
})

</script>

<style scoped>
.container {
  width: 1360px;
  height: 800px;
}
</style>