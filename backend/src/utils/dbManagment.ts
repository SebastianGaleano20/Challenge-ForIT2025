import fs from "node:fs";
//Importamos fs para utilizar los modulos de node.

const readData = () => {
  const jsonData = fs.readFileSync("./database/pizza.json");
  const pizzas = JSON.parse(jsonData);
  return pizzas;
};
/*
-Utilizamos fs.readFileSync para leer la base de datos
-Utilizamos JSON.parse para obtener los datos en un objeto y poder utilizarlo.
-Retornamos la base de datos en formato objeto  */

const writeData = (jsonData) => {
  fs.writeFileSync("../database/pizza.json", jsonData);
};
//fs.writeFileSync para sobreescribir la base de datos

export { readData, writeData };
//exportamos los modulos creados para leer y modificar la base de datos
