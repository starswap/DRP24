FROM node:22-alpine3.19
RUN apk --update --no-cache add python3~3.10.14   --repository=http://dl-cdn.alpinelinux.org/alpine/v3.16/main 
RUN apk add ffmpeg
COPY . /app/
RUN cd /app/frontend && npm install && npm run build
RUN cd /app/backend && pip install --break-system-packages -r requirements.txt
