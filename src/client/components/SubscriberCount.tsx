import { useEffect, useState } from "react";

export const SubscriberCount = () => {
  const [count, setCount] = useState("Loading...");

  useEffect(() => {
    const fetchCount = async () => {
      const data = await fetch("/api/health")
        .then((res) => res.json())
        .catch((e) => console.warn(e));
      setCount(data);
    };

    fetchCount();
  }, []);

  const status = `${count} - ${new Date().toLocaleString()}`;

  return (
    <div className="flex justify-center p-4">
      <p>{status}</p>
    </div>
  );
};
