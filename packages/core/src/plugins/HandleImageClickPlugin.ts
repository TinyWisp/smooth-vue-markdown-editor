import type { MditRendererRuleMap } from '@/CoreEditor/types'
import type { CorePlugin } from './CorePlugin'
import { uniqId, escapeHtml } from '@/utils/util'

export interface ImageData {
  src: string
  alt: string
  title: string
  id: string
}

export type ImageClickEventHandler = (images: ImageData[], idx: number, event: Event) => void

class HandleImageClickPlugin implements CorePlugin {
  readonly name: string
  images: ImageData[]
  mditRendererRuleMap: MditRendererRuleMap
  fnImageClick: ImageClickEventHandler

  constructor(fnImageClick: ImageClickEventHandler) {
    this.name = 'imageClickEvent'
    this.images = []
    this.mditRendererRuleMap = {
      image: this.imageRenderer
    }
    this.fnImageClick = fnImageClick
  }

  mditBeforeRender(): void {
    this.images.splice(0, this.images.length)
  }

  imageRenderer(tokens: any[], idx: number): string {
    const id = `image_click_event_plugin_${uniqId()}`
    const attrs = tokens[idx].attrs
    const attrMap: {[key: string]: string} = {}
    attrs.forEach((item: any[]) => {
      if (item.length >= 2) {
        const key = item[0]
        const val = item[1]
        attrMap[key] = val
      }
    })
    const src = attrMap.src
    const alt = tokens[idx].content
    const title = attrMap.title ?? alt
    const counter = this.images.length

    this.images.push({
      src, alt, title, id
    })

    setTimeout(()=>{
      const el = document.getElementById(id)
      el && el.addEventListener('click', (e) => {
        this.fnImageClick(this.images, counter, e)
      })
    }, 0)

    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" title="${escapeHtml(title)}" id="${id}" class="svme-image-click-event-plugin">`
  }
}

function handleImageClickPlugin(fnImageClick: ImageClickEventHandler) {
  return new HandleImageClickPlugin(fnImageClick)
}

export default handleImageClickPlugin