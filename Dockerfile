FROM python:3.10-bullseye
RUN apt-get update
RUN apt-get install -y ffmpeg
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs
COPY . /app/
RUN cd /app/frontend && npm install && npm run build
RUN cd /app/backend && python3 -m pip install -r requirements.txt
