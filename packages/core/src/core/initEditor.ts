import { ref, shallowRef, watch, type Ref } from 'vue'
import { minimalSetup, basicSetup } from 'codemirror'
import { EditorView, keymap } from '@codemirror/view'
import { EditorSelection } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { indentWithTab, undo, redo } from "@codemirror/commands"
import type { CmPasteEventHandlerMap, FnGetContext, FnSetContext } from './types'

export function initEditor(getContext: FnGetContext, setContext: FnSetContext) {
  const context = getContext()
  const doc = context.doc!
  const pluginManager = context.pluginManager!
  const editorEl = context.editor.el!
  const cmEditorView: Ref<EditorView | null> = shallowRef(null)

  /**
   * paste
   */
  const pasteEventHandlerMap: CmPasteEventHandlerMap = pluginManager.getCmPasteEventHandlerMap()
  function pasteHandler(cevent: ClipboardEvent) {
    if(cevent.clipboardData?.items) {
      for (const item of cevent.clipboardData.items) {
        if (pasteEventHandlerMap[item.type]) {
          (pasteEventHandlerMap[item.type])(item)
          return
        }

        for (const handlerType of Object.keys(pasteEventHandlerMap)) {
          const tmps1 = handlerType.split('/')
          const tmps2 = item.type.split('/')
          if (tmps1.length === 2 && tmps2.length === 2 && tmps1[0] === tmps2[0] && tmps1[1] === '*') {
            pasteEventHandlerMap[handlerType](item)
            return
          }
        }
      }
    }
  }


  function createEditorView() {
    cmEditorView.value = new EditorView({
      doc: doc.value,
      parent: editorEl.value!,
      extensions: [
        ...pluginManager.getCmExtensions(),
        basicSetup,
        keymap.of([indentWithTab]),
        markdown(pluginManager.getCmMarkdownConfig()),
        EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            doc.value = viewUpdate.state.doc.toString()
          }
        }),
        EditorView.domEventHandlers({
          paste: pasteHandler,
          ...pluginManager.getCmDomEventHandlerMap(),
        }),
      ]
    })
  }

  watch(
    editorEl,
    () => {
      editorEl.value && createEditorView()
    }
  )


  /**
   * insert at the cursor or replace the selection.
   * @param {string} text
   * @param {boolean} forceNewLine whether to insert a newline when the cursor is not at the beginning of a line.
   */
  function insertOrReplace(text: string, forceNewLine: boolean = false) {
    if (!cmEditorView.value) {
      console.log("the codemirror's instance is not created.")
      return
    }

    const keyword = '<-->'
    const selectionRange = cmEditorView.value.state.selection.ranges[0]
    const selectedText = cmEditorView.value.state.sliceDoc(selectionRange.from, selectionRange.to)
    let insertText = text.replace(keyword, selectedText)
    let newCursorPos = selectionRange.from === selectionRange.to && text.indexOf(keyword) >= 0
                        ? selectionRange.from + text.indexOf(keyword)
                        : selectionRange.from + insertText.length
    const prevChar = selectionRange.from > 0
                    ? cmEditorView.value.state.doc.toString().charAt(selectionRange.from - 1)
                    : null
    if (forceNewLine && prevChar !== '\n' && prevChar !== null) {
      insertText = '\n' + insertText
      newCursorPos += 1
    }

    cmEditorView.value.focus()
    cmEditorView.value.dispatch({
      changes: cmEditorView.value.state.changes([{
        from: selectionRange.from,
        to: selectionRange.to,
        insert: insertText,
      }]),
      selection: EditorSelection.create([
        EditorSelection.range(newCursorPos, newCursorPos),
      ]),
    })
  }

  const commandMap: { [key: string]: (params: any) => void } = {
    undo: () => {
      cmEditorView.value && undo(cmEditorView.value)
    },
    redo: () => {
      cmEditorView.value && redo(cmEditorView.value)
    },
    bold: () => {
      insertOrReplace('**<-->**')
    },
    italic: () => {
      insertOrReplace('*<-->*')
    },
    strike: () => {
      insertOrReplace('~~<-->~~')
    },
    underline: () => {
      insertOrReplace('++<-->++')
    },
    subscript: () => {
      insertOrReplace('~<-->~')
    },
    superscript: () => {
      insertOrReplace('^<-->^')
    },
    mark: () => {
      insertOrReplace('==<-->==')
    },
    heading1: () => {
      insertOrReplace('# <-->', true)
    },
    heading2: () => {
      insertOrReplace('## <-->', true)
    },
    heading3: () => {
      insertOrReplace('### <-->', true)
    },
    heading4: () => {
      insertOrReplace('#### <-->', true)
    },
    heading5: () => {
      insertOrReplace('##### <-->', true)
    },
    heading6: () => {
      insertOrReplace('###### <-->', true)
    },
    bulletedList: () => {
      insertOrReplace('- <-->', true)
    },
    numberedList: () => {
      insertOrReplace('1. <-->', true)
    },
    quote: () => {
      insertOrReplace('> <-->', true)
    },
    codeBlock: () => {
      insertOrReplace('```language\n<-->\n```\n', true)
    },
    image: (params: {title: string, url: string}) => {
      insertOrReplace(`![${params?.title}](${params?.url})`)
    },
    link: (params: {title: string, url: string}) => {
      insertOrReplace(`[${params?.title}](${params?.url})`)
    },
    horizontalRule: () => {
      insertOrReplace('---\n', true)
    },
    table: (params: {row: number, col: number}) => {
      const {row = 1, col = 1} = params

      const rows: string[] = []
      rows.push('|' + ' |'.repeat(col))
      rows.push('|' + '-|'.repeat(col))
      for (let i=0; i<row; i++) {
        rows.push('|' + ' |'.repeat(col))
      }
      const text = rows.join('\n') + '\n'
      insertOrReplace(text, true)
    },
    ...pluginManager.getCommandMap()
  }

  /**
   * execute a command
   * @param {string} cmd
   * @param {object} params
   */
  function command(cmd: string, params?: object) {
    if (!commandMap[cmd]) {
      console.error(`invalid command: ${cmd}`)
      return
    }
    commandMap[cmd](params)
  }

  /**
   * scroll to line 
   */
  function scrollToLine(lineNum: number) {
    const line = cmEditorView.value!.state.doc.line(lineNum + 1)
    const { node } = cmEditorView.value!.domAtPos(line.from)

    if (node.firstChild) {
      node.firstChild.parentElement?.scrollIntoView()
      return
    }

    node.parentElement?.scrollIntoView()
  }

  /**
   * move lines to a new position
   */
  function moveLinesTo(lineBegin: number, lineEnd: number, lineDes: number) {
    if (!cmEditorView.value) {
      return
    }

    const state = cmEditorView.value.state

    if (lineBegin < 0 || lineBegin + 1 > state.doc.lines) {
      console.log(`invalid parameter: lineBegin: ${lineBegin}`)
      return
    }

    if (lineEnd < 0 || lineEnd < lineBegin || lineEnd + 1 > state.doc.lines) {
      console.log(`invalid parameter: lineEnd: ${lineEnd}`)
      return
    }

    const from = state.doc.line(lineBegin + 1).from
    const to = state.doc.line(lineEnd + 1).to
    const text = state.doc.slice(from, to)

    cmEditorView.value.focus()
    cmEditorView.value.dispatch({
      changes: cmEditorView.value.state.changes([
        {
          from,
          to, 
          insert: '',
        }, {
          from: state.doc.line(lineDes).from,
          to: state.doc.line(lineDes).from,
          insert: text 
        }])
    })
  }


  setContext('editor', 'insertOrReplace', insertOrReplace)
  setContext('editor', 'command', command)
  setContext('editor', 'scrollToLine', scrollToLine)
  setContext('editor', 'moveLinesTo', moveLinesTo)
  setContext('editor', 'cmEditorView', cmEditorView)
}