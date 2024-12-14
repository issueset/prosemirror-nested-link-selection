import './style.css'

import { exampleSetup } from 'prosemirror-example-setup'
import { DOMParser, Schema, type Mark, type MarkSpec } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

const link: MarkSpec = schema.spec.marks.get('link')!

const myLink: MarkSpec = {
  ...link,
  toDOM: (mark: Mark) => {
    const href = mark.attrs.href as string

    return [
      'a',
      {
        class: 'border-pink-500 border-solid py-1 px-1 gap-1 inline-flex',
        href,
      },
      [
        'span',
        {
          class: 'border-yellow-500 border-solid px-1',
        },
        0,
      ],
      [
        'span',
        {
          class: 'border-lime-500 border-solid px-1',
        },
        '(tail)',
      ],
    ]
  },
}

const mySchema = new Schema({
  nodes: schema.spec.nodes,
  marks: schema.spec.marks.update('link', myLink),
})

const view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector('#content')!,
    ),
    plugins: exampleSetup({ schema: mySchema }),
  }),
})

;(window as any).view = view
