# Trabajo Practico Sistemas Distribuidos

## Integrantes
- Barriga Nahuel.

- Deserti Manuel.

- Firmani Gregorio.

- Gonzalez Franco.

- Hernandez Julieta.


# Sistema de Monitoreo y Control de Ganado

Este proyecto es una implementación de un sistema distribuido para monitorear y controlar ganado mediante tecnología Bluetooth y puntos de control basados en Wemos/Arduino. Fue desarrollado como parte del trabajo práctico integrador de la materia **Sistemas Distribuidos** en la Universidad Nacional de Mar del Plata.
El trabajo constará de dos versiones, una con los requisitos funcionales y no funcionales para la aprobación del trabajo y otra con los requisitos para su promoción, la cual implementa frameworks y otras funcionalidades. Según la version que quiera ejecutarse, es la branch del proyecto que deba seleccionar. Los nombres de cada una son autoexplicativos.

## Descripción

La finalidad de este sistema es simular un monitoreo de ganado. Cada animal lleva un collar con un dispositivo Bluetooth, y su proximidad a puntos de control (representados por dispositivos Wemos/Arduino) se utiliza para registrar su ubicación y estado en el sistema. Su visualizacion dependerá de la version del proyecto, la básica los mostrará mediante latitud y longitud y la version de promocion mediante un mapa.

## Tecnologías y Herramientas

- **Node.js**: API HTTP y lógica de negocio sin frameworks externos (en la version que no contempla los requisitos de promocion de la materia).
- **Vanilla JavaScript (SPA)**: Interfaz gráfica compatible con navegadores modernos. Utilizada en la mayoria del proyecto.
- **Persistencia en JSON**: Los datos de los animales, checkpoints, administradores se almacenan en archivos planos en formato JSON.
- **Entorno de programacion Arduino:** para manipulacion de la placa Wemos. Puede descargarse desde https://www.arduino.cc/en/software 

Backend:
- **Brcypt**: para hashear, almacenar y comparar contraseñas de los usuarios administradores del sistema.
- **MQTT**: Comunicación entre checkpoints (Wemos/Arduino) y una Raspberry Pi que actúa como Gateway.

Frontend:
- **Axios:** Para las requests HTTP.
- **HTML**
- **CSS**


Version de promocion
- **Express**: framework utilizado, el frontend está adaptado tambien a la utilizacion de Express.
- **jsonwebtoken** para gestionar los JWT.
- Se ha implementado un mapa para mostrar los animales, fue implementado con https://leafletjs.com/
 



## Requerimientos previos a la ejecucion del proyecto

- **Node.js** y **npm**: Tener instalados [Node.js](https://nodejs.org/) y npm.
- **Dispositivos Wemos/Arduino**: Configurados con Bluetooth para simular puntos de control.
- **Raspberry Pi**: Actúa como Gateway con un broker MQTT instalado.
- **MQTT Broker**: Configurado en la Raspberry Pi.
- Contar con una version de Express posterior a la 5.0

## Instalación del proyecto

Clonar el repositorio:
   ```bash
   git clone https://github.com/Franco-15/tp-sistemas-distribuidos.git
   cd tp-sistemas-distribuidos
```

## Instrucciones de ejecución:
0. Ubicarse en el directorio de la API.
    `cd servidor`  
1. Instalar dependencias en el package.json
    `npm install`       
2. **Backend**: ejecutar desde el directorio del package servidor
    `npm run dev`
3. Ubicarse en el directorio del frontend
    `cd front`
4. **Frontend:** ejecutar `node app.js`
   
5. Abrir un navegador web y acceder a http://localhost:3001 para ver el frontend en acción.
6. Desde el entorno de programacion Arduino procure seleccionar la placa correcta y ejecutar el codigo.
   
   ![image](https://github.com/user-attachments/assets/7ca6c836-beb9-4fdd-a0d3-fc40b03b683c)
  


## **Consideraciones**:

**Usuario administrador default**

Para realizar el login desde el frontend el usuario y contraseña default es "admin" en ambos casos.

### Códigos de Error
| Código | Descripción                                 |
|--------|---------------------------------------------|
| 400    | Solicitud incompleta o incorrecta           |
| 401    | Token faltante o contraseña incorrecta      |
| 403    | Token incorrecto o sin permisos             |
| 404    | Ruta o recurso no encontrado                |
| 500    | Error interno en el servidor                |

 ## **Contribuciones**
Para las implementaciones del manejo de tokens, interfaz web y manejo de tópicos MQTT nos basamos en el repositorio de un referente de la informática como lo es Martin Ignacio Casas.
[https://github.com/casasmartinignacio](https://github.com/casasmartinignacio?tab=repositories) 

