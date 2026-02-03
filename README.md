# 📅 Agenda Sexto - Backend API

## 📖 Descripción

**Agenda Sexto Backend** es una API REST robusta y escalable diseñada para la gestión integral de contactos y tareas. El sistema permite crear, leer, actualizar y gestionar el estado de contactos con sus respectivas imágenes de perfil almacenadas en la nube, así como organizar tareas con diferentes niveles de prioridad y fechas de vencimiento.

### Características principales:
- ✅ Gestión completa de contactos con imágenes
- ✅ Sistema de tareas con prioridades (Baja, Media, Alta)
- ✅ Almacenamiento de imágenes en Cloudinary
- ✅ Paginación en todas las consultas
- ✅ Validación exhaustiva de datos
- ✅ Sistema de activación/desactivación de registros
- ✅ Rate limiting para prevenir abuso
- ✅ Seguridad con Helmet y CORS configurables

---

## 🛠️ Tech Stack

### Backend Framework & Runtime
- **Node.js** `v14+` - Entorno de ejecución JavaScript
- **Express.js** `v5.2.1` - Framework web minimalista y flexible

### Base de Datos
- **MongoDB** - Base de datos NoSQL orientada a documentos
- **Mongoose** `v9.1.5` - ODM (Object Data Modeling) para MongoDB

### Almacenamiento en la Nube
- **Cloudinary** `v2.9.0` - Gestión y almacenamiento de imágenes
- **Multer** `v2.0.2` - Middleware para manejo de archivos multipart/form-data
- **multer-storage-cloudinary** `v4.0.0` - Integración de Multer con Cloudinary

### Seguridad
- **Helmet** `v8.1.0` - Protección de headers HTTP
- **CORS** `v2.8.6` - Control de acceso entre dominios
- **express-rate-limit** `v8.2.1` - Limitación de peticiones
- **express-validator** `v7.3.1` - Validación y sanitización de datos

### Utilidades
- **dotenv** `v17.2.3` - Gestión de variables de entorno
- **jsonwebtoken** `v9.0.3` - Generación y verificación de tokens JWT
- **morgan** `v1.10.1` - Logger de peticiones HTTP
- **uuid** `v13.0.0` - Generación de identificadores únicos
- **axios** `v1.13.4` - Cliente HTTP

### Gestor de Paquetes
- **pnpm** - Gestor de paquetes rápido y eficiente en disco

---

## 🚀 Instalación

### Requisitos Previos
Asegúrate de tener instalado:
- **Node.js** v14 o superior ([Descargar](https://nodejs.org/))
- **pnpm** ([Instalación](https://pnpm.io/installation))
- **MongoDB** (local o cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Cuenta de Cloudinary** ([Registrarse gratis](https://cloudinary.com/users/register/free))

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-.git
cd Agenda_Sexto-BACKEND-
```

2. **Instalar dependencias con pnpm**
```bash
pnpm install
```

> **Nota:** Si no tienes pnpm instalado, puedes instalarlo globalmente con:
> ```bash
> npm install -g pnpm
> ```

3. **Configurar variables de entorno** (ver sección siguiente)

4. **Iniciar el servidor**
```bash
pnpm run dev
```

El servidor estará corriendo en: `http://localhost:3001`

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# ==============================================
# CONFIGURACIÓN DEL SERVIDOR
# ==============================================
PORT=3001

# ==============================================
# CONFIGURACIÓN DE BASE DE DATOS - MONGODB
# ==============================================
# Opción 1: MongoDB Local
URI_MONGODB=mongodb://localhost:27017/agendaSexto

# Opción 2: MongoDB Atlas (Recomendado para producción)
# URI_MONGODB=mongodb+srv://usuario:password@cluster.mongodb.net/agendaSexto?retryWrites=true&w=majority

# ==============================================
# CONFIGURACIÓN DE CLOUDINARY
# ==============================================
# Obtén estas credenciales en: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

### ¿Cómo obtener las credenciales de Cloudinary?

1. Regístrate en [Cloudinary](https://cloudinary.com/users/register/free)
2. Ve a tu Dashboard
3. Copia los valores de:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### ¿Cómo obtener la URI de MongoDB Atlas?

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo Cluster (Free Tier disponible)
3. Ve a "Connect" > "Connect your application"
4. Copia la URI de conexión y reemplaza `<password>` con tu contraseña

---

## 📂 Estructura del Proyecto

```
Agenda_Sexto-BACKEND-/
│
├── 📁 configs/                        # Configuraciones del servidor
│   ├── app.js                         # Configuración principal de Express
│   ├── db.js                          # Conexión y configuración de MongoDB
│   ├── cors-configurations.js         # Configuración de CORS
│   └── helmet-configuration.js        # Configuración de seguridad Helmet
│
├── 📁 middlewares/                    # Middlewares personalizados
│   ├── check-validators.js            # Verificación de errores de validación
│   ├── contacts-validators.js         # Validadores específicos de contactos
│   ├── tasks-validators.js            # Validadores específicos de tareas
│   ├── file-uploader.js               # Configuración de Multer y Cloudinary
│   ├── delete-file-on-error.js        # Limpieza de archivos tras errores
│   ├── handle-errors.js               # Manejador global de errores
│   └── request-limit.js               # Configuración de rate limiting
│
├── 📁 src/                            # Código fuente principal
│   │
│   ├── 📁 contacts/                   # Módulo de Contactos
│   │   ├── contact.model.js           # Esquema y modelo de Mongoose
│   │   ├── contact.controller.js      # Lógica de negocio
│   │   └── contact.router.js          # Definición de rutas
│   │
│   └── 📁 tasks/                      # Módulo de Tareas
│       ├── task.model.js              # Esquema y modelo de Mongoose
│       ├── task.controller.js         # Lógica de negocio
│       └── task.router.js             # Definición de rutas
│
├── 📄 .env                            # Variables de entorno (no incluido en Git)
├── 📄 .gitignore                      # Archivos ignorados por Git
├── 📄 index.js                        # Punto de entrada de la aplicación
├── 📄 package.json                    # Dependencias y scripts npm
├── 📄 pnpm-lock.yaml                  # Lockfile de pnpm
├── 📄 LICENSE                         # Licencia del proyecto
└── 📄 README.md                       # Documentación (este archivo)
```

### Descripción de Carpetas

| Carpeta | Descripción |
|---------|-------------|
| `configs/` | Contiene todas las configuraciones del servidor, base de datos y seguridad |
| `middlewares/` | Funciones intermedias que procesan peticiones antes de llegar a los controladores |
| `src/contacts/` | Módulo completo para la gestión de contactos (Modelo-Vista-Controlador) |
| `src/tasks/` | Módulo completo para la gestión de tareas (Modelo-Vista-Controlador) |

---

## ⚙️ Scripts Disponibles

En el archivo `package.json` se definen los siguientes scripts:

| Comando | Descripción |
|---------|-------------|
| `pnpm start` | Inicia el servidor en modo producción con Node.js |
| `pnpm run dev` | Inicia el servidor en modo desarrollo con **nodemon** (recarga automática) |
| `pnpm test` | Ejecuta las pruebas (actualmente no configurado) |

### Uso de los Scripts

```bash
# Desarrollo - Con recarga automática al detectar cambios
pnpm run dev

# Producción - Sin recarga automática
pnpm start
```

### Configuración de Nodemon

El servidor en modo desarrollo utiliza **nodemon** que reinicia automáticamente cuando detecta cambios en archivos `.js`.

---

## 🌐 Endpoints Principales

**Base URL:** `http://localhost:3001/agendaSexto/v1`

### 🏥 Health Check
```
GET /agendaSexto/v1/health
```
Verifica que el servidor está funcionando correctamente.

### 👥 Contactos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/contacts` | Obtener todos los contactos (con paginación) |
| `GET` | `/contacts/:id` | Obtener un contacto por ID |
| `POST` | `/contacts` | Crear un nuevo contacto |
| `PUT` | `/contacts/:id` | Actualizar un contacto existente |
| `PUT` | `/contacts/:id/activate` | Activar un contacto |
| `PUT` | `/contacts/:id/desactivate` | Desactivar un contacto |

### ✅ Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Obtener todas las tareas (con paginación) |
| `GET` | `/tasks/:id` | Obtener una tarea por ID |
| `POST` | `/tasks` | Crear una nueva tarea |
| `PUT` | `/tasks/:id` | Actualizar una tarea existente |
| `PUT` | `/tasks/:id/activate` | Activar una tarea |
| `PUT` | `/tasks/:id/desactivate` | Desactivar una tarea |

---

## 📋 Ejemplos de Requests

### 🏥 1. Health Check

**Request:**
```http
GET http://localhost:3001/agendaSexto/v1/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "Agenda Sexto",
  "version": "1.0.0"
}
```

---

### 👥 2. Crear un Contacto

**Request:**
```http
POST http://localhost:3001/agendaSexto/v1/contacts
Content-Type: multipart/form-data
```

**Body (Form-Data):**
```
contactName: Juan Pérez
email: juan.perez@example.com
phoneNumber: +50212345678
image: [archivo de imagen]
```

**Response (201 Created):**
```json
{
  "succes": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50212345678",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

### 👥 3. Obtener Contactos con Paginación

**Request:**
```http
GET http://localhost:3001/agendaSexto/v1/contacts?page=1&limit=10&isActive=true
```

**Response (200 OK):**
```json
{
  "succes": true,
  "data": [
    {
      "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
      "contactName": "Juan Pérez",
      "email": "juan.perez@example.com",
      "phoneNumber": "+50212345678",
      "photo": "contacts/contact_abc123.jpg",
      "isActive": true,
      "createdAt": "2024-03-18T10:30:00.000Z"
    }
  ],
  "pagination": {
    "cuurentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "limit": 10
  }
}
```

---

### ✅ 4. Crear una Tarea

**Request:**
```http
POST http://localhost:3001/agendaSexto/v1/tasks
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Revisar código del proyecto",
  "description": "Realizar code review del módulo de autenticación",
  "expiredDate": "2024-03-30T18:00:00.000Z",
  "priority": "Alta"
}
```

**Response (201 Created):**
```json
{
  "succes": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d3",
    "title": "Revisar código del proyecto",
    "description": "Realizar code review del módulo de autenticación",
    "expiredDate": "2024-03-30T18:00:00.000Z",
    "priority": "Alta",
    "isActive": false,
    "createdAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

### ✅ 5. Actualizar una Tarea

**Request:**
```http
PUT http://localhost:3001/agendaSexto/v1/tasks/65f7a1b2c3d4e5f6a7b8c9d3
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Revisar código del proyecto - Actualizado",
  "priority": "Media"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d3",
    "title": "Revisar código del proyecto - Actualizado",
    "description": "Realizar code review del módulo de autenticación",
    "expiredDate": "2024-03-30T18:00:00.000Z",
    "priority": "Media",
    "isActive": false,
    "createdAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

### 👥 6. Activar/Desactivar un Contacto

**Request (Activar):**
```http
PUT http://localhost:3001/agendaSexto/v1/contacts/65f7a1b2c3d4e5f6a7b8c9d0/activate
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Contacto activado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50212345678",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

## 🗄️ Modelos de Base de Datos

### Modelo: Contact (Contacto)

```javascript
{
  _id: ObjectId,                    // ID único generado por MongoDB
  contactName: String,              // Nombre del contacto (requerido, máx. 100 caracteres)
  email: String,                    // Email válido (requerido)
  phoneNumber: String,              // Número de teléfono en formato internacional (opcional)
  photo: String,                    // Ruta de la imagen en Cloudinary (opcional)
  isActive: Boolean,                // Estado del contacto (default: true)
  createdAt: Date                   // Fecha de creación (automática)
}
```

#### Validaciones del Modelo Contact:
- **contactName**: Requerido, texto, máximo 100 caracteres
- **email**: Requerido, formato email válido (regex: `/.+\@.+\..+/`)
- **phoneNumber**: Opcional, formato internacional (regex: `/^\+?[1-9]\d{1,14}$/`)
- **photo**: Opcional, por defecto: `contacts/kinal_sport_nyvxo5`
- **isActive**: Booleano, por defecto: `true`

#### Índices:
```javascript
- { isActive: 1 }
- { contactName: 1 }
- { contactName: 1, isActive: 1 }
```

---

### Modelo: Task (Tarea)

```javascript
{
  _id: ObjectId,                    // ID único generado por MongoDB
  title: String,                    // Título de la tarea (requerido, máx. 150 caracteres)
  description: String,              // Descripción detallada (opcional, máx. 500 caracteres)
  expiredDate: Date,                // Fecha de vencimiento (opcional)
  priority: String,                 // Prioridad: "Baja", "Media" o "Alta" (default: "Media")
  isActive: Boolean,                // Estado de la tarea (default: false)
  createdAt: Date                   // Fecha de creación (automática)
}
```

#### Validaciones del Modelo Task:
- **title**: Requerido, texto, máximo 150 caracteres
- **description**: Opcional, texto, máximo 500 caracteres
- **expiredDate**: Opcional, tipo Date (formato ISO 8601)
- **priority**: Enum: `["Baja", "Media", "Alta"]`, por defecto: `"Media"`
- **isActive**: Booleano, por defecto: `false`

#### Índices:
```javascript
- { isActive: 1 }
- { expiredDate: 1 }
- { priority: 1, isActive: 1 }
```

---

---

## 📡 Documentación Detallada de Endpoints

### 👥 Contactos - Endpoints Completos

### 1. Obtener todos los contactos
**GET** `/agendaSexto/v1/contacts`

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Cantidad de registros por página (default: 10)
- `isActive` (opcional): Filtrar por estado activo (true/false)

**Ejemplo de petición:**
```
GET http://localhost:3001/agendaSexto/v1/contacts?page=1&limit=10&isActive=true
```

**Respuesta exitosa (200):**
```json
{
  "succes": true,
  "data": [
    {
      "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
      "contactName": "Juan Pérez",
      "email": "juan.perez@example.com",
      "phoneNumber": "+50212345678",
      "photo": "contacts/contact_abc123.jpg",
      "isActive": true,
      "createdAt": "2024-03-18T10:30:00.000Z"
    }
  ],
  "pagination": {
    "cuurentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "limit": 10
  }
}
```

### 2. Obtener un contacto por ID
**GET** `/agendaSexto/v1/contacts/:id`

**Parámetros:**
- `id`: ID del contacto (MongoDB ObjectId)

**Ejemplo de petición:**
```
GET http://localhost:3001/agendaSexto/v1/contacts/65f7a1b2c3d4e5f6a7b8c9d0
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50212345678",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Contacto no encontrado"
}
```

### 3. Crear un nuevo contacto
**POST** `/agendaSexto/v1/contacts`

**Content-Type:** `multipart/form-data`

**Body Parameters:**
- `contactName` (requerido): Nombre del contacto (máx. 100 caracteres)
- `email` (requerido): Correo electrónico válido
- `phoneNumber` (opcional): Número de teléfono en formato internacional
- `image` (opcional): Archivo de imagen (file)

**Ejemplo de petición en Postman:**

1. Selecciona el método `POST`
2. URL: `http://localhost:3001/agendaSexto/v1/contacts`
3. En la pestaña "Body", selecciona "form-data"
4. Agrega los siguientes campos:

| KEY          | VALUE                          | TYPE |
|--------------|--------------------------------|------|
| contactName  | María González                 | Text |
| email        | maria.gonzalez@example.com     | Text |
| phoneNumber  | +50298765432                   | Text |
| image        | [Seleccionar archivo de imagen]| File |

**Respuesta exitosa (201):**
```json
{
  "succes": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d1",
    "contactName": "María González",
    "email": "maria.gonzalez@example.com",
    "phoneNumber": "+50298765432",
    "photo": "contacts/contact_xyz789.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T11:00:00.000Z"
  }
}
```

### 4. Actualizar un contacto
**PUT** `/agendaSexto/v1/contacts/:id`

**Content-Type:** `multipart/form-data`

**Parámetros:**
- `id`: ID del contacto a actualizar

**Body Parameters (todos opcionales):**
- `contactName`: Nuevo nombre del contacto
- `email`: Nuevo email
- `phoneNumber`: Nuevo teléfono
- `image`: Nueva imagen (file)

**Ejemplo de petición en Postman:**

1. Selecciona el método `PUT`
2. URL: `http://localhost:3001/agendaSexto/v1/contacts/65f7a1b2c3d4e5f6a7b8c9d0`
3. En la pestaña "Body", selecciona "form-data"
4. Agrega los campos que deseas actualizar:

| KEY          | VALUE                      | TYPE |
|--------------|----------------------------|------|
| contactName  | Juan Pérez Actualizado     | Text |
| phoneNumber  | +50299999999               | Text |

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Contacto actualizado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez Actualizado",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50299999999",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

### 5. Activar un contacto
**PUT** `/agendaSexto/v1/contacts/:id/activate`

**Parámetros:**
- `id`: ID del contacto

**Ejemplo de petición:**
```
PUT http://localhost:3001/agendaSexto/v1/contacts/65f7a1b2c3d4e5f6a7b8c9d0/activate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Contacto activado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50212345678",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

### 6. Desactivar un contacto
**PUT** `/agendaSexto/v1/contacts/:id/desactivate`

**Parámetros:**
- `id`: ID del contacto

**Ejemplo de petición:**
```
PUT http://localhost:3001/agendaSexto/v1/contacts/65f7a1b2c3d4e5f6a7b8c9d0/desactivate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Contacto desactivado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d0",
    "contactName": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phoneNumber": "+50212345678",
    "photo": "contacts/contact_abc123.jpg",
    "isActive": false,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

## ✅ Endpoints de Tareas

### 1. Obtener todas las tareas
**GET** `/agendaSexto/v1/tasks`

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Cantidad de registros por página (default: 10)
- `isActive` (opcional): Filtrar por estado activo (true/false)

**Ejemplo de petición:**
```
GET http://localhost:3001/agendaSexto/v1/tasks?page=1&limit=10&isActive=true
```

**Respuesta exitosa (200):**
```json
{
  "succes": true,
  "data": [
    {
      "_id": "65f7a1b2c3d4e5f6a7b8c9d2",
      "title": "Completar informe mensual",
      "description": "Generar y enviar el informe mensual de actividades",
      "expiredDate": "2024-03-25T23:59:59.000Z",
      "priority": "Alta",
      "isActive": true,
      "createdAt": "2024-03-18T10:30:00.000Z"
    }
  ],
  "pagination": {
    "cuurentPage": 1,
    "totalPages": 3,
    "totalRecords": 30,
    "limit": 10
  }
}
```

### 2. Obtener una tarea por ID
**GET** `/agendaSexto/v1/tasks/:id`

**Parámetros:**
- `id`: ID de la tarea (MongoDB ObjectId)

**Ejemplo de petición:**
```
GET http://localhost:3001/agendaSexto/v1/tasks/65f7a1b2c3d4e5f6a7b8c9d2
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d2",
    "title": "Completar informe mensual",
    "description": "Generar y enviar el informe mensual de actividades",
    "expiredDate": "2024-03-25T23:59:59.000Z",
    "priority": "Alta",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

### 3. Crear una nueva tarea
**POST** `/agendaSexto/v1/tasks`

**Content-Type:** `application/json`

**Body Parameters:**
- `title` (requerido): Título de la tarea (máx. 150 caracteres)
- `description` (opcional): Descripción de la tarea (máx. 500 caracteres)
- `expiredDate` (opcional): Fecha de vencimiento (ISO 8601)
- `priority` (opcional): Prioridad - "Baja", "Media" o "Alta" (default: "Media")

**Ejemplo de petición en Postman:**

1. Selecciona el método `POST`
2. URL: `http://localhost:3001/agendaSexto/v1/tasks`
3. En la pestaña "Headers":
   - Key: `Content-Type`, Value: `application/json`
4. En la pestaña "Body", selecciona "raw" y "JSON":

```json
{
  "title": "Revisar código del proyecto",
  "description": "Realizar code review del módulo de autenticación",
  "expiredDate": "2024-03-30T18:00:00.000Z",
  "priority": "Alta"
}
```

**Respuesta exitosa (201):**
```json
{
  "succes": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d3",
    "title": "Revisar código del proyecto",
    "description": "Realizar code review del módulo de autenticación",
    "expiredDate": "2024-03-30T18:00:00.000Z",
    "priority": "Alta",
    "isActive": false,
    "createdAt": "2024-03-18T12:00:00.000Z"
  }
}
```

### 4. Actualizar una tarea
**PUT** `/agendaSexto/v1/tasks/:id`

**Content-Type:** `application/json`

**Parámetros:**
- `id`: ID de la tarea a actualizar

**Body Parameters (todos opcionales):**
- `title`: Nuevo título
- `description`: Nueva descripción
- `expiredDate`: Nueva fecha de vencimiento
- `priority`: Nueva prioridad ("Baja", "Media", "Alta")

**Ejemplo de petición en Postman:**

1. Selecciona el método `PUT`
2. URL: `http://localhost:3001/agendaSexto/v1/tasks/65f7a1b2c3d4e5f6a7b8c9d2`
3. En la pestaña "Body", selecciona "raw" y "JSON":

```json
{
  "title": "Completar informe mensual - Actualizado",
  "priority": "Media",
  "description": "Generar, revisar y enviar el informe mensual de actividades al equipo"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d2",
    "title": "Completar informe mensual - Actualizado",
    "description": "Generar, revisar y enviar el informe mensual de actividades al equipo",
    "expiredDate": "2024-03-25T23:59:59.000Z",
    "priority": "Media",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

### 5. Activar una tarea
**PUT** `/agendaSexto/v1/tasks/:id/activate`

**Parámetros:**
- `id`: ID de la tarea

**Ejemplo de petición:**
```
PUT http://localhost:3001/agendaSexto/v1/tasks/65f7a1b2c3d4e5f6a7b8c9d2/activate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea activado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d2",
    "title": "Completar informe mensual",
    "description": "Generar y enviar el informe mensual de actividades",
    "expiredDate": "2024-03-25T23:59:59.000Z",
    "priority": "Alta",
    "isActive": true,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

### 6. Desactivar una tarea
**PUT** `/agendaSexto/v1/tasks/:id/desactivate`

**Parámetros:**
- `id`: ID de la tarea

**Ejemplo de petición:**
```
PUT http://localhost:3001/agendaSexto/v1/tasks/65f7a1b2c3d4e5f6a7b8c9d2/desactivate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea desactivado exitosamente",
  "data": {
    "_id": "65f7a1b2c3d4e5f6a7b8c9d2",
    "title": "Completar informe mensual",
    "description": "Generar y enviar el informe mensual de actividades",
    "expiredDate": "2024-03-25T23:59:59.000Z",
    "priority": "Alta",
    "isActive": false,
    "createdAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

## 🔐 Seguridad

El proyecto implementa las siguientes medidas de seguridad:

- **Helmet**: Protección de headers HTTP
- **CORS**: Control de acceso entre dominios
- **Rate Limiting**: Limitación de peticiones para prevenir ataques DDoS
- **Express Validator**: Validación y sanitización de datos de entrada
- **Variables de entorno**: Protección de credenciales sensibles

## ⚠️ Códigos de Estado HTTP

La API utiliza los siguientes códigos de estado:

- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error en la validación de datos
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

---

## 🔐 Seguridad y Mejores Prácticas

El proyecto implementa múltiples capas de seguridad:

### Medidas Implementadas
- ✅ **Helmet**: Protección de headers HTTP contra vulnerabilidades conocidas
- ✅ **CORS**: Control de acceso entre dominios con configuración personalizable
- ✅ **Rate Limiting**: Prevención de ataques de fuerza bruta y DDoS
- ✅ **Express Validator**: Validación y sanitización de datos de entrada
- ✅ **Variables de Entorno**: Protección de credenciales sensibles (.env)
- ✅ **Manejo de Errores**: Sistema centralizado de manejo de errores

### Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| `200` | OK | Petición exitosa (GET, PUT) |
| `201` | Created | Recurso creado exitosamente (POST) |
| `400` | Bad Request | Error en la validación de datos |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error del servidor |

---

## 🧪 Pruebas con Postman

### Configuración de Colección Postman

1. **Crear una nueva colección** llamada "Agenda Sexto API"

2. **Configurar variables de entorno:**
   - Variable: `base_url` → Valor: `http://localhost:3001/agendaSexto/v1`
   - Variable: `contact_id` → Valor: (ID de prueba)
   - Variable: `task_id` → Valor: (ID de prueba)

3. **Estructura de carpetas recomendada:**
```
📁 Agenda Sexto API
├── 🏥 Health Check
│   └── GET Health
├── 📁 Contacts
│   ├── GET All Contacts
│   ├── GET Contact by ID
│   ├── POST Create Contact
│   ├── PUT Update Contact
│   ├── PUT Activate Contact
│   └── PUT Deactivate Contact
└── 📁 Tasks
    ├── GET All Tasks
    ├── GET Task by ID
    ├── POST Create Task
    ├── PUT Update Task
    ├── PUT Activate Task
    └── PUT Deactivate Task
```

### Ejemplo de Variables en URLs
```
GET {{base_url}}/contacts
GET {{base_url}}/contacts/{{contact_id}}
PUT {{base_url}}/tasks/{{task_id}}/activate
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

### Proceso de Contribución

1. **Fork del proyecto**
   ```bash
   # Haz clic en el botón "Fork" en GitHub
   ```

2. **Clona tu fork**
   ```bash
   git clone https://github.com/TU_USUARIO/Agenda_Sexto-BACKEND-.git
   cd Agenda_Sexto-BACKEND-
   ```

3. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   # o para correcciones de bugs:
   git checkout -b fix/correccion-bug
   ```

4. **Instala las dependencias**
   ```bash
   pnpm install
   ```

5. **Realiza tus cambios**
   - Asegúrate de seguir el estilo de código existente
   - Comenta tu código cuando sea necesario
   - Actualiza la documentación si es relevante

6. **Commit de tus cambios**
   ```bash
   git add .
   git commit -m "feat: Agregar nueva funcionalidad X"
   # o
   git commit -m "fix: Corregir problema Y"
   ```

   **Convenciones de commits:**
   - `feat:` Nueva característica
   - `fix:` Corrección de bug
   - `docs:` Cambios en documentación
   - `style:` Cambios de formato (no afectan el código)
   - `refactor:` Refactorización de código
   - `test:` Agregar o modificar tests
   - `chore:` Tareas de mantenimiento

7. **Push a tu rama**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

8. **Abre un Pull Request**
   - Ve a tu fork en GitHub
   - Haz clic en "Compare & pull request"
   - Describe los cambios realizados
   - Espera la revisión del equipo

### Guías de Contribución

#### ✅ Buenas Prácticas
- Escribe código limpio y legible
- Sigue la estructura de carpetas existente
- Agrega validaciones apropiadas
- Maneja errores correctamente
- Usa nombres descriptivos para variables y funciones

#### ❌ Evita
- Cambiar la estructura principal sin discutirlo primero
- Subir archivos de configuración personal (`.env`, `.vscode`, etc.)
- Hacer commits con mensajes poco descriptivos
- Mezclar múltiples funcionalidades en un solo PR

### Reportar Bugs

Si encuentras un bug, por favor abre un [issue](https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-/issues) con:

1. **Título descriptivo** del problema
2. **Pasos para reproducir** el bug
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Capturas de pantalla** (si aplica)
5. **Entorno**: SO, versión de Node.js, etc.

### Sugerir Mejoras

Para sugerir mejoras o nuevas funcionalidades:

1. Abre un [issue](https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-/issues) con la etiqueta "enhancement"
2. Describe detalladamente la funcionalidad propuesta
3. Explica por qué sería útil
4. Si es posible, proporciona ejemplos o mockups

---

## 📄 Licencia

Este proyecto está bajo la **Licencia ISC**.

```
ISC License

Copyright (c) 2024 SERV-DRV

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## 👨‍💻 Autor & Contacto

**SERV-DRV Team**

- 🐙 GitHub: [@SERV-DRV](https://github.com/SERV-DRV)
- 📦 Repositorio: [Agenda_Sexto-BACKEND-](https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-)
- 🐛 Reportar Issues: [Issues Page](https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-/issues)

---

## 📧 Soporte

¿Necesitas ayuda? Tenemos varias opciones:

1. **📖 Documentación**: Revisa este README completo
2. **🐛 Issues**: [Abre un issue](https://github.com/SERV-DRV/Agenda_Sexto-BACKEND-/issues) en GitHub
3. **💬 Discusiones**: Participa en las discusiones del proyecto
4. **📧 Email**: Contacta al equipo de desarrollo

### Preguntas Frecuentes (FAQ)

**Q: ¿Puedo usar este proyecto para propósitos comerciales?**  
A: Sí, el proyecto está bajo licencia ISC que permite uso comercial.

**Q: ¿Cómo actualizo las dependencias?**  
A: Ejecuta `pnpm update` para actualizar todas las dependencias.

**Q: ¿Dónde almaceno las imágenes?**  
A: Las imágenes se almacenan en Cloudinary. Necesitas configurar tus credenciales en el archivo `.env`.

**Q: ¿Puedo usar MongoDB local en lugar de Atlas?**  
A: Sí, solo cambia la URI en el archivo `.env` a tu instancia local de MongoDB.

---

<div align="center">

### ⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Desarrollado con ❤️ por el equipo de SERV-DRV**

[⬆ Volver arriba](#-agenda-sexto---backend-api)

</div>