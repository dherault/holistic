import React, { useState } from 'react'

import { Radio, RadioGroup } from 'honorable'

export default {
  title: 'RadioGroup',
  component: RadioGroup,
}

function Template(args: any) {
  return (
    <RadioGroup {...args}>
      <Radio value={0}>
        Zero
      </Radio>
      <Radio value={1}>
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}

function Template2(args: any) {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <Radio value={0}>
        Zero
      </Radio>
      <Radio value={1}>
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}

function Template3(args: any) {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <Radio value={0}>
        Zero
      </Radio>
      <Radio
        disabled
        value={1}
      >
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Controlled = Template2.bind({})
Controlled.args = {
}

export const Disabled = Template3.bind({})
Disabled.args = {
}

export const Row = Template3.bind({})
Row.args = {
  row: true,
}
