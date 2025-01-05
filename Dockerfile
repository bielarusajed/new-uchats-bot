FROM node:22-slim

WORKDIR /app

RUN apt update && \
    apt install -y --no-install-recommends python3 sqlite3 libsqlite3-dev make g++ curl unzip ca-certificates && \
    update-ca-certificates && \
    apt-get clean && \
    curl -o install.sh https://bun.sh/install && \
    chmod +x install.sh && \
    ./install.sh && \
    mv ~/.bun/bin/bun /usr/local/bin/bun

COPY package.json bun.lock ./
RUN bun install

COPY . .
RUN chmod +x /app/entrypoint.sh

VOLUME /data
ENV DB_FILE_NAME=/data/db.sqlite

ENTRYPOINT [ "/app/entrypoint.sh" ]
