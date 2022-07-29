import React from 'react';
import { useState } from 'react-redux';
const CreateSession = () => {
  const [title, setTitle] = useState('');

  return (
    <div>
      <h2>여기서 session을 만들어봅시다.</h2>
    </div>
  );
};

export default CreateSession;
