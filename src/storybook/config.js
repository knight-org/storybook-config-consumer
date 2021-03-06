
import React from 'react'
import { storiesOf, configure } from '@storybook/react'
import { withReadme }  from 'storybook-readme'
import storieConfigs from './stories.js'
import { adapterFeth, adapterXHR } from './http-mock'

adapterFeth()
adapterXHR()

configure(
  () => {
    storieConfigs.forEach(storieConfig => {
      let { stories, name, readme } = storieConfig
      let storiesInstence = storiesOf(name, module)

      storiesInstence.addDecorator(withReadme([ readme ]))

      stories.forEach(({ name, story }) => {
        storiesInstence.add(name, () => <div id="storybook-screenshot-container">
          <story.component />
        </div>)
      })
    })
  },
  module
)
