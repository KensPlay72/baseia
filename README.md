## BaseIA – Mini Motor de IA con Búsqueda Semántica
## Descripción

BaseIA es un mini motor de inteligencia artificial que responde preguntas utilizando archivos locales como base de conocimiento. Implementa un enfoque tipo RAG (Retrieval-Augmented Generation), donde primero se recupera información relevante desde documentos y luego se genera una respuesta basada únicamente en ese contexto.

El objetivo del proyecto es demostrar habilidades en backend, manejo de APIs, procesamiento de texto y despliegue de aplicaciones modernas.


## Tecnologías utilizadas
Next.js (App Router)
TypeScript
TailwindCSS
API compatible con OpenAI
Node.js (filesystem)

## Funcionalidades
Lectura de archivos locales (.md o .txt)
División de texto en fragmentos (chunking)
Generación de embeddings
Almacenamiento en memoria
Búsqueda semántica mediante similitud coseno
Endpoint API para preguntas
Generación de respuestas con contexto
Retorno de fuentes (citas)
Interfaz web simple

## Estructura del proyecto
src/
    app/
        api/
            answer/
                route.ts
lib/
    chunker.ts
    loader.ts
    embeddings.ts
    search.ts
data/
    file1.md
    file2.md


## Como funciona
Se cargan los archivos desde la carpeta /data.
El contenido se divide en fragmentos de aproximadamente 500–800 caracteres.

Cada fragmento se convierte en un embedding utilizando un modelo de IA.

Los embeddings se almacenan en memoria junto con su contenido.

Cuando el usuario hace una pregunta:
Se genera un embedding de la pregunta.
Se comparan todos los fragmentos usando similitud coseno.
Se seleccionan los fragmentos más relevantes.

Se envía el contexto al modelo de lenguaje para generar una respuesta.

Se devuelve la respuesta junto con las fuentes utilizadas.

## Endpoint API
POST /api/answer

Request:
{
"question": "¿Qué es la inteligencia artificial?"
}

Response:
{
"answer": "Respuesta generada...",
"sources": ["file1.md", "file2.md"]
}

## Configuración de entorno
Crear un archivo .env basado en .env.example:

AI_API_KEY=tu_api_key
AI_BASE_URL=https://api.openai.com/v1

## Instalación y ejecución
Instalar dependencias:
npm install

Ejecutar en desarrollo:
npm run dev

Abrir en el navegador:
http://localhost:3000


## Consideraciones
No se utiliza base de datos externa, todo se maneja en memoria.
Los embeddings se generan una sola vez al iniciar el servidor.
Las respuestas están limitadas al contenido de los documentos.
Si la información no existe en los archivos, el sistema lo indica.

##  Posibles mejoras
Cache persistente de embeddings
Streaming de respuestas
Mejor manejo de citas (highlighting)
Soporte para más formatos de documentos
Indexación incremental

## Autor
Marvin Melgar
marvinsaid110@gmail.com
+504 88885857

## link
https://baseia.vercel.app/