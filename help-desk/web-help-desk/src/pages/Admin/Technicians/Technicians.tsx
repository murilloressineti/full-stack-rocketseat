import { useState, useEffect } from "react";
import { getTechnicians } from "@/services";
import type { AppUser } from "@/types";

export default function AdminTechnicians() {
  const [technicians, setTechnicians] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTechnicians() {
      try {
        const data = await getTechnicians();

        setTechnicians(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTechnicians();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="">
      {technicians.map((technician) => (
        <div key={technician.id}>
          <p>{technician.name}</p>
          <p>{technician.email}</p>
        </div>
      ))}
    </div>
  );
}
