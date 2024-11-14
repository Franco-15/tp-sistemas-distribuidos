# Trabajo Practico Sistemas Distribuidos

## Integrantes
-Barriga Nahuel.
-Deserti Manuel.
-Firmani Gregorio.
-Gonzalez Franco.
-Hernandez Julieta.


# Sistema de Monitoreo y Control de Ganado

Este proyecto es una implementación de un sistema distribuido para monitorear y controlar ganado mediante tecnología Bluetooth y puntos de control basados en Wemos/Arduino. Fue desarrollado como parte del trabajo práctico integrador de la materia **Sistemas Distribuidos** en la Universidad Nacional de Mar del Plata.

## Descripción

La finalidad de este sistema es simular un monitoreo de ganado, reemplazando métodos visuales por un sistema de identificación y rastreo en tiempo real. Cada animal lleva un collar con un dispositivo Bluetooth, y su proximidad a puntos de control (representados por dispositivos Wemos/Arduino) se utiliza para registrar su ubicación y estado en el sistema.

## Tecnologías y Herramientas

- **Node.js**: API HTTP y lógica de negocio sin frameworks externos.
- **MQTT**: Comunicación entre puntos de control (Wemos/Arduino) y una Raspberry Pi que actúa como Gateway.
- **Vanilla JavaScript (SPA)**: Interfaz gráfica compatible con navegadores modernos.
- **Persistencia en JSON**: Los datos de los animales y administradores se almacenan en archivos planos en formato JSON.

## Requerimientos Previos

- **Node.js** y **npm**: Asegúrate de tener instalados [Node.js](https://nodejs.org/) y npm.
- **Dispositivos Wemos/Arduino**: Configurados con Bluetooth para simular puntos de control.
- **Raspberry Pi**: Actúa como Gateway con un broker MQTT instalado.
- **MQTT Broker**: Configurado en la Raspberry Pi.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Franco-15/tp-sistemas-distribuidos.git
   cd tp-sistemas-distribuidos

## Ejecución
**-Backend**: ejecutar desde la consola
 ```bash
npm run dev
```

