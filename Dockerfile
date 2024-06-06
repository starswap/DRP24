FROM node:22-alpine3.19
RUN apk add py3-pip
RUN apk add ffmpeg
COPY . /app/
RUN cd /app/frontend && npm install && npm run build
RUN cd /app/backend && pip install --break-system-packages -r requirements.txt
