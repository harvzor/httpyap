FROM ghcr.io/charmbracelet/vhs:v0.11.0
RUN apt-get update && apt-get install -y nodejs npm
COPY . /app
RUN cd /app && npm install && npm install -g .
