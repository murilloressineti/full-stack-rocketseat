import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("courses").insert([
    { name: "CSS" },
    { name: "Javascript" },
    { name: "Reat" },
    { name: "Node.js" },
    { name: "Git" },
    { name: "GitHub" },
    { name: "TypeScrpit" },
    { name: "Express.js" },
    { name: "Banco de dados" },
  ]);
}
