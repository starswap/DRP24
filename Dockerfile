FROM node:22-alpine3.19
COPY backend /app/backend
COPY frontend /app/frontend
RUN cd /app/frontend && npm install && npm run build
RUN cd /app/backend && pip install -r requirements.txt
