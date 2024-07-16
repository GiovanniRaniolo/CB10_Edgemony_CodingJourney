import React, { useEffect, useState } from "react";

function CleanupEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      console.log("Cleaning up interval");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mb-6 p-4 bg-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center">Cleanup Effect</h2>
      <p className="text-blue-700 bg-yellow-400 text-center m-2 rounded-xl text-sm">
        Sets an interval that updates a counter every second and clears it when
        the component is unmounted, demonstrating how to handle the cleanup of
        effects.
      </p>
      <p className="font-bold text-gray-500 text-center">Count: {count}</p>
    </div>
  );
}

export default CleanupEffect;
