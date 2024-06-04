FROM node:22-alpine3.19
COPY backend /app/backend
COPY frontend /app/frontend
RUN cd frontend && npm install && npm run build
RUN cd backend && pip install -r requirements.txt
