# 🧠 Fullstack Task Manager - ForIT Challenge

Este proyecto es una aplicación **Fullstack CRUD de tareas** desarrollada con **Node.js + Express + TypeScript** para el backend y **React + Vite + TypeScript** en el frontend. Fue desarrollado como parte del desafío técnico de ForIT, con el objetivo de demostrar habilidades en diseño de APIs REST, manejo del estado en React, UI responsiva y buenas prácticas de código.

---

## 🚀 Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- File System como persistencia (sin base de datos)
- Arquitectura modular y controladores

### Frontend

- React
- Vite
- TypeScript
- CSS puro (sin frameworks)
- Responsive Design (con menú hamburguesa)
- Manejo de rutas (SPA)
- Componentes reutilizables y custom hooks

---

## 📦 Backend - API REST

El backend está construido con Express y TypeScript, estructurado con rutas, controladores y servicios, utilizando archivos JSON como almacenamiento persistente.

### ✳️ Endpoints disponibles

| Método | Ruta                    | Descripción                                         |
| ------ | ----------------------- | --------------------------------------------------- |
| GET    | `/api/tasks`            | Obtener todas las tareas                            |
| POST   | `/api/tasks/create`     | Crear una nueva tarea                               |
| GET    | `/api/tasks/:id`        | Obtener tarea por ID                                |
| PUT    | `/api/tasks/edit/:id`   | Editar tarea existente (excepto `id` y `createdAt`) |
| DELETE | `/api/tasks/delete/:id` | Eliminar tarea por ID                               |

### 🧾 Formato de datos

#### `interface Task`:

```ts
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
```

#### Body para crear una tarea

```json
{
  "title": "Aprender TypeScript",
  "description": "Estudiar tipos, interfaces y clases."
}
```

---

## 💻 Frontend - SPA React + Vite

La interfaz fue construida como una SPA usando React y Vite. La aplicación consume los endpoints REST, mostrando datos dinámicamente con interactividad y diseño moderno.

### 📂 Vistas implementadas

1. **Dashboard + Sidebar**  
   Navegación fija, con menú hamburguesa y transición responsive.

2. **Lista de Tareas (`/`)**

   - Muestra todas las tareas en tarjetas (`CardTask`)
   - Permite editar y eliminar tareas
   - Checkbox para marcar como completadas (efecto visual + lógica)

3. **Crear Tarea (`/crear`)**

   - Formulario con validación
   - Notificación de éxito/error con `Modal` personalizado

4. **Ver/Editar Tarea (`/editar/:id`)**
   - Carga los datos de la tarea individual
   - Permite editar título, descripción y estado `completed`

---

## 🎨 CSS y diseño responsivo

- **CSS puro modularizado** por componente
- **Variables CSS globales** con `:root` para colores, fuentes, bordes
- Diseño 100% **responsive**, sin usar frameworks
- **Transiciones suaves** y feedback visual (line-through, opacidad, modales)

---

## 🧠 Habilidades demostradas

- Diseño y consumo de APIs RESTful
- Buenas prácticas en TypeScript y tipado estricto
- Manejo del estado en React con `useState`, `useEffect`
- Navegación entre vistas y parámetros de rutas
- Componentización clara, código limpio y reutilizable
- Maquetado moderno, responsive y accesible
- Comunicación asincrónica entre frontend y backend

---

## 🙏 Agradecimientos

Gracias al equipo de **ForIT** por la oportunidad de demostrar mis conocimientos y habilidades técnicas. Este proyecto fue desarrollado con dedicación para cubrir todos los aspectos de una app real, desde el backend hasta la experiencia de usuario en frontend.
Se utilizar tailwindcss y nextjs, pero preferi realizarlo de esta manera ya que pude demostrar más conocimientos que poseo como programador.

---

## 🛠️ Instalación

### Backend

```bash
cd backend
pnpm install
pnpm run dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

---
