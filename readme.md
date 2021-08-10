# Personal blog system

## Project introduce

frontend backend separate develop. frontend main technology stack have `Vue`、`Nuxt`、`axios`、`vueX`、`ElementUI`,backend main technology stack have `ThinkPHP`、`Jwt`.

## Install tutorials

Need three domain,bind separately frontend、backend、interface.

First implement `git clone https://github.com/sanqi377/qblog.git` download to local.

### Interface build

Tack `interface` catalogue upload to server. revise database connect to `config/database.php`, setting `ThinkPHP` pseudo static and bind domain.

### Frontend build

Tack command `cd frontend` go frontend catalogue.

revise `api/axios.js` internal `baseURL` to myself interface domain.

Then tack command:

```bash
npm install
```

if you want debug, then tack command `npm run dev`.

if you want build, then after tack command `npm run build` upload `dist` catalogue to you server bind domain.

### Backend build

Tack command `cd backend` go backend catalogue then after tack under command:

```bash
npm install
```

if you want debug, then tack command `npm run dev`.

if you want build, then after tack command `npm run build` upload `dist` catalogue to you server bind domain.

## Demo site

[小柒博客](https://www.qblog.cc)
