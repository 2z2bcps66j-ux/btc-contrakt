# BTC Contrakt - Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- MongoDB (managed via Docker)

## Local Development

### Setup
```bash
npm install
cp .env.example .env
```

### Run Development
```bash
npm run dev
```
Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api

## Docker Deployment

### Build & Run
```bash
docker-compose up -d
```

### Check Logs
```bash
docker-compose logs -f app
```

### Stop
```bash
docker-compose down
```

## Production Setup

### 1. Environment Variables
Edit `.env.production` with your settings:
```env
JWT_SECRET=<generate_secure_key>
MONGO_URI=<your_mongodb_connection>
```

### 2. Database Initialization
```bash
docker exec btc-contrakt-app npm run migrate
```

### 3. Nginx Reverse Proxy
Use provided `nginx.conf` for production reverse proxy

### 4. SSL Certificate (Let's Encrypt)
```bash
certbot certonly --standalone -d yourdomain.com
```

## Monitoring

### View Logs
```bash
docker-compose logs -f
```

### Database Backup
```bash
docker exec btc-contrakt-db mongodump --out /backup
```

### Health Check
```bash
curl http://localhost:5000/api/auth/status
```

## Troubleshooting

### Port Already in Use
```bash
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

### Database Connection
```bash
docker-compose logs mongodb
```

### Clear Database (⚠️ WARNING - Data Loss)
```bash
docker-compose down -v
```

## Security Checklist
- [ ] Change JWT_SECRET in .env
- [ ] Change MongoDB password
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Regular backups
- [ ] Monitor logs for suspicious activity
