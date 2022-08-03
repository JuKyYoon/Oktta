import React from 'react';

const MessageItem = (props) => {
  return (
    <li>{props.from} : {props.data}</li>
  )
}

export default React.memo(MessageItem);
