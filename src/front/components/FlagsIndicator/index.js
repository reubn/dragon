import React from 'react'

import {known, tempDisabled, disabled, unknown} from './style'

const classMap = {known, tempDisabled, disabled, unknown}

export default ({flags, ...props}) => {
  let key = 'unknown'
  if(flags) key = 'known'

  if(flags && flags.includes('DISABLED')) key = 'disabled'
  if(flags && flags.includes('TEMP-DISABLED')) key =  'tempDisabled'


  console.log(key)

  return (
    <svg viewBox="0 0 32 32" {...props}>
      <circle className={classMap[key]} cx="16" cy="16" r="6" />
    </svg>
  )
}
