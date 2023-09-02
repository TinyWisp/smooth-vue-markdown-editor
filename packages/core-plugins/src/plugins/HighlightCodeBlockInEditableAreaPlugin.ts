import { languages } from "@codemirror/language-data"
import type { CorePlugin } from "@smooth-vue-markdown-editor/core"

class HighlightCodeBlockInEditableAreaPlugin implements CorePlugin {
  name: string = 'core-plugin-highlight-code-block-in-editable-area'
  cmMarkdownConfig: object

  constructor() {
    this.cmMarkdownConfig = {
      codeLanguages: languages
    }
  }
}

export default function HighlightCodeBlockInEditableArea() {
  return new HighlightCodeBlockInEditableAreaPlugin()
}