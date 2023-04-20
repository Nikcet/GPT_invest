import React, { useEffect, memo, useState } from 'react';
// import aiAPI from './utils/openAI-API';
import Output from './components/Output/Output';
import Form from './components/Form/Form';
// const { Configuration, OpenAIApi } = require("openai");

function App() {

  return (
    <main className="app">
      <Form />
      <Output />
    </main>
  );
}

export default memo(App);
