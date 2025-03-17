#!/bin/sh

# Start Spring Boot in the background
pm2 start "java -jar /app/app.jar" --name movie-bucketlist-backend

# Start Next.js in the background
cd /frontend && pm2 start "npm run start" --name movie-bucketlist-frontend


# Keep the container running
tail -f /dev/null
