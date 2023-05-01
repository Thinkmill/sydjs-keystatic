import { component, fields } from '@keystatic/core'
import React from 'react'

export const organiserListBlock = component({
  label: 'Organisers',
  schema: {
    content: fields.array(
      fields.object({
        organiser: fields.relationship({
          label: 'Organiser',
          collection: 'persons',
          validation: { isRequired: true },
        }),
      }),
      {
        itemLabel: (props) => props.fields.organiser.value,
      }
    ),
  },
  preview: (props) => (
    <ul>
      {props.fields.content.elements.map((el) => (
        <li key={el.key}>{el.fields.organiser.value}</li>
      ))}
    </ul>
  ),
})
