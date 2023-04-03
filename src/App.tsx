import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="h-screen p-8 bg-purple-700">
      <header className="text-white text-center mb-10">
        <h1 className="text-4xl">MASH</h1>
      </header>
      {loading ? (
        <p className="text-center">
          <i className="inline-block animate-bounce">⏳</i>
        </p>
      ) : null}
    </main>
  );
}

export default App;
