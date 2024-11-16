# Trabajo Practico Sistemas Distribuidos

## Integrantes
- Barriga, Nahuel.

- Deserti, Manuel.

- Firmani, Gregorio.

- Gonzalez, Franco.

- Hernandez, Julieta.


# Sistema de Monitoreo y Control de Ganado

Este proyecto es una implementación de un sistema distribuido para monitorear y controlar ganado mediante tecnología Bluetooth y puntos de control basados en Wemos/Arduino. Fue desarrollado como parte del trabajo práctico integrador de la materia **Sistemas Distribuidos** en la Universidad Nacional de Mar del Plata.
El trabajo constará de dos versiones, una con los requisitos funcionales y no funcionales para la aprobación del trabajo y otra con los requisitos para su promoción, la cual implementa frameworks y otras funcionalidades. Según la version que quiera ejecutarse, es la branch del proyecto que deba seleccionar. Los nombres de cada una son autoexplicativos.

## Descripción

La finalidad de este sistema es simular un monitoreo de ganado. Cada animal lleva un collar con un dispositivo Bluetooth, y su proximidad a puntos de control (representados por dispositivos Wemos/Arduino) se utiliza para registrar su ubicación y estado en el sistema. Su visualizacion dependerá de la version del proyecto, la básica los mostrará mediante latitud y longitud y la version de promocion mediante un mapa.

## Tecnologías y Herramientas

- **Node.js**: API HTTP y lógica de negocio sin frameworks externos (en la version que no contempla los requisitos de promocion de la materia).
- **Vanilla JavaScript (SPA)**: Interfaz gráfica compatible con navegadores modernos. Utilizada en la mayoria del proyecto.
- **Persistencia en JSON**: Los datos de los animales, checkpoints, administradores se almacenan en archivos planos en formato JSON.
- **Entorno de programacion Arduino:** para manipulacion de la placa Wemos. Puede descargarse desde [Arduino](https://www.arduino.cc/en/software)

Backend:
- **Bcrypt**: para hashear, almacenar y comparar contraseñas de los usuarios administradores del sistema.
- **MQTT**: Comunicación entre checkpoints (Wemos/Arduino) y una Raspberry Pi que actúa como Gateway.

Frontend:
- **Axios:** Para las requests HTTP.
- **HTML**
- **CSS**


Version de promocion:
- **Express**: framework utilizado, el frontend está adaptado tambien a la utilizacion de Express.
- **jsonwebtoken** para gestionar los JWT.
- Se ha implementado un mapa para mostrar los animales, fue implementado con [Leafletjs](https://leafletjs.com/)
 



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

## Instrucciones de ejecución

### Backend
0. Ubicarse en el directorio de la API.
    ```bash  
    cd servidor
    ``` 
1. Instalar dependencias en el package.json
    ```bash  
    npm install
    ```
2. Configurar el archivo .env con las variables de entorno necesarias. Ver archivo `.env.example` para más información.
    
    ```bash  
    MQTT_BROKER_URL =
    MQTT_TOPIC =
    ACCESS_TOKEN_SECRET = 
    REFRESH_TOKEN_SECRET = 
    ```

3. Ejecutar servidor
    ```bash  
    npm run start
    ```   

### Frontend
1. Ubicarse en el directorio del frontend 
   ```bash
   cd front
    ```
2. Instalar dependencias en el package.json
    ```javascript  
    npm install
    ```  
3. Ejecutar servidor
    ```javascript  
    node app.js
    ```

4. Abrir un navegador web y acceder a http://localhost:3001 para ver el frontend en acción.


#### ***Consideraciones***:

##### Credenciales de Login:

    username: admin
    password: admin

#### Códigos de Error
| Código | Descripción                                 |
|--------|---------------------------------------------|
| 400    | Solicitud incompleta o incorrecta           |
| 401    | Token faltante o contraseña incorrecta      |
| 403    | Token incorrecto o sin permisos             |
| 404    | Ruta o recurso no encontrado                |
| 500    | Error interno en el servidor                |


### Arduino

1. Ingresar en la carpeta `puntoControl` y abrir el archivo `puntoControl.ino` con el IDE de Arduino.

2. Configurar el archivo `puntoControl.ino` con las credenciales de la red WiFi y el broker MQTT.

    ![image](image.png)

3. Seleccione la placa Wemos D1 R1 y el puerto correspondiente, como se muestra en la imagen.
   
   ![image](https://github.com/user-attachments/assets/7ca6c836-beb9-4fdd-a0d3-fc40b03b683c)

4. Compile y suba el código a la placa Wemos.

### Broker MQTT

1. Crear el archivo de configuracion `mosquitto/config/mosquitto.conf` con el siguiente contenido:

    ```text
    allow_anonymous true
    listener 1883
    ```

2. Ejecutar en consola el siguiente comando para crear y ejecutar el contenedor de Mosquitto:

    ```bash
    docker run -d --name mosquitto-broker -p 1883:1883 -v <ruta-absoluta-mosquitto.conf>:/mosquitto/config/mosquitto.conf eclipse-mosquitto
    ```



## **Contribuciones**
Para las implementaciones del manejo de tokens, interfaz web y manejo de tópicos MQTT nos basamos en el repositorio de Martin Ignacio Casas, ayudante de la materia.
[https://github.com/casasmartinignacio](https://github.com/casasmartinignacio?tab=repositories) 

