# AmneziaVPN WEB-панель

Панель для управления и мониторинга пользователей для self-hosted VPN-сервера AmneziaVPN.

## Установка и запуск

### Требования

- VPS сервер на Debian/Ubuntu с установленным VPN от Amnezia (docker)
- Node.js v20+

### 1. Клонирование репозитория:

```bash
git clone https://github.com/1-WOOPER-1/amneziavpn-web.git
cd amneziavpn-web
```

### 2. Запуск backend части:

Перейти в папку:

```bash
cd backend
```

Создать файл `.env`, на основе примера указать свои параметры контейнера и сервера \
Пример файла `.env`:

```env
PORT=3001
CONTAINER_NAME=amnezia-awg2
INTERFACE_NAME=awg0
```

Установить зависимости:

```bash
npm install
```

Запустить в режиме разработки:

```bash
npm run dev
```
