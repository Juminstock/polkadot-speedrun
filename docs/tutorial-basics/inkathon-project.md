---
sidebar_position: 1
description: Crear un proyecto completo de ink! con la herramienta de ink!athon
tags:
  - ink!
  - basic
---

# Crea un proyecto con ink!athon

![Ink!athon banner](../../static/img/inkathon-banner.png)

## Getting Started
Con esta guía técnica aprenderás a cómo crear, configurar y deployar un proyecto completo de ink! usando ink!athon, el Full-stack DApp boilerplate para Substrate y smart contracts construídos con ink!. Esta guía está enfocada en developers nuevos en el ecosistema de Polkadot o que no hayan usado antes la herramienta de ink!athon. ¡Empecemos! 

## Pre-requisitos
Para llevar a cabo con éxito esta guía técnica, deberás realizar las siguientes acciones necesarias:
- Instalar [Node.js](https://nodejs.org/en) v18+ (es recomendado hacerlo vía [nvm](https://github.com/nvm-sh/nvm) usando `nvm install 18`)
- Instalar [pnpm](https://pnpm.io/installation) (es recomendado instalarlo vía Node.js Corepack o usando `npm i -g pnpm`)
- Clonar el repositorio de ink!athon [aquí](https://github.com/scio-labs/inkathon)
- Instalar Rust y sus toolchains (usa esta [guía de Substrate](https://docs.substrate.io/install/))
- Instalar cargo contract (usa esta [guía de Parity](https://github.com/use-ink/cargo-contract))
- Instalar un nodo local de desarrollo (opcional, puedes usar [swanky-node](https://github.com/inkdevhub/swanky-node) o [substrate-node](https://github.com/paritytech/substrate-contracts-node)) 

![inkathon-stack](../../static/img/inkathon-stack-diagram.png)

## Construir el proyecto

### 1. Clonar el repositorio
Lo primero que debes hacer es clonar el repositorio, hazlo en tu terminal con este comando:

```bash
git clone git@github.com:scio-labs/inkathon.git
```

Esto generará una carpeta con todos los archivos provenientes del repositorio de GitHub. Ahora deberás posicionarte dentro de la carpeta y para ello, ejecuta este comando:

```bash
cd inkathon
```

### 2. Instalar dependencias
Instala las dependencias del proyecto y ejecuta el frontend con los siguientes comandos:

```bash title="/inkathon"
# Instala dependencias (una vez)
# NOTA: Esto automáticamente crea un archivo `.env.local`
pnpm install
```
```bash title="/inkathon"
# Inicia el proyecto de Next.js
pnpm run dev
```

### 3. Construir y deployar contratos
El repositorio trae consigo un smart contract plantilla para testing, pasa a compilarlo y deployarlo con los siguientes comandos:

```bash title="/inkathon"
cd contracts
```
:::warning

Dentro de la carpeta `contracts` hay un archivo `rust-toolchain`, abrélo e introduce este código:

```toml
[toolchain]
channel = "1.69.0"
components = [ "rustfmt", "rust-src" ]
targets = [ "wasm32-unknown-unknown" ]
profile = "minimal"
```

Esto evitará que te topes con problemas de compilación y de versionado con Rust y cargo contract. Puedes seguir el tutorial sin problema.

:::

```bash title="/inkathon/contracts"
pnpm run build
```

Luego, puedes iniciar un nodo local para desarrollo. El proyecto de ink!athon trae uno consigo al momento de clonar el repositorio, o sencillamente podrías usar uno de los que descargaste externamente. Usemos el [substrate-node](https://github.com/paritytech/substrate-contracts-node) que trae ink!athon. Para usarlo solo debes correr el siguiente comando:

```bash title="/inkathon/contracts"
pnpm run node
```

El output se debería ver de esta manera:

![substrate-node-init](../../static/img/substrate-node-init.png)

Finalmente, pasemos a deployar el contrato a través del siguiente comando:

```bash title="/inkathon/contracts"
pnpm run deploy
```

Si todo ocurrió con éxito, verás esta información en tu terminal:

![deployed-contract](../../static/img/deployed-contract.png)

:::note

Ten presente que el deploy del contrato lo hicimos en el nodo local de `substrate-node`, para hacerlo en otra red puedes pasar la flag `CHAIN` en la línea de comandos al momento de deployar de esta manera: `CHAIN=alephzero-testnet pnpm run deploy`

:::

## Conectar el frontend a la red
La herramienta de ink!athon nos provee de un frontend preconfigurado y estilizado, por defecto viene conectado a la red de `aleph-zero testnet` pero podemos configurarla y es justo lo que haremos en este momento. Abre el archivo `.env.local` que esta dentro de la carpeta `frontend` y setea el valor actual de la variable `NEXT_PUBLIC_DEFAULT_CHAIN` por `development`.

Finalmente, reinicia el servidor de Next.js y ya podrás interactuar con tu nodo local y los smart contracts desplegados en el. Deberías ver tu frontend algo similar a esto:

![substrate-node-frontend](../../static/img/frontend-node-connect.png)

## Desplegar el proyecto
Finalmente, una vez que hayas construído y compilado nuestros contratos, modificado el frontend a las necesidades de nuestro proyecto y habiendo modificado la red para el deploy de los smart contracts, ¡Estamos listos para desplegar nuestro proyecto en Vercel! Para ello solo debemos posicionarnos en el root de nuestro proyecto y correr el comando:

```bash title="/inkathon"
vercel
```

Este comando iniciará un proceso de verificación y en caso que no la tengas conectada te pedirá que conectes tu cuenta de Vercel. Una vez realizado esto, solo deberás interactuar con el CLI de Vercel modificando unos pocos valores y aprobando otros. Finalizado este proceso, verás un output muy similar a este:

![Vercel output](../../static/img/vercel-output.png)

Si lo notas, el output final que dice `✅ Production` es un link, justo ese es el link de tu proyecto público desplegado en Vercel. ¡Felicidades! Con esto has finalizado con éxito este tutorial 🥳.

:::info

Fuente principal: https://github.com/scio-labs/inkathon

:::
