import React, { useEffect, useState } from "react";
import MashGame from "./components/MashGame";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-purple-700">
      {loading ? (
        <p className="text-center">
          <span className="inline-block animate-bounce">⏳</span>
        </p>
      ) : (
        <MashGame numGroups={4} numItemsPerGroup={4} />
      )}
    </main>
  );
}

export default App;
