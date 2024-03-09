import React from 'react'
import Markdown from 'react-markdown'

function Inbox({type,text}) {
  return (
    <div class={`${type===1?"self-start bg-[#1D2736] text-white":"self-end bg-[#222328] text-white"} text-left   rounded-lg p-4 max-w-[75%]`}><p>
   <Markdown>{text}</Markdown>
</p></div>
  )
}

export default Inbox