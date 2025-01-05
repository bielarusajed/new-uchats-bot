FROM node:22-slim

WORKDIR /app

RUN apt update && \
    apt install -y --no-install-recommends python3 sqlite3 libsqlite3-dev make g++ wget unzip ca-certificates && \
    update-ca-certificates && \
    apt-get clean && \
    export ARCH=$(uname -m) && \
    export BUN_ARCH=$(if [ "$ARCH" = "x86_64" ]; then echo "${ARCH}-baseline"; else echo "${ARCH}"; fi) && \
    wget "https://github.com/oven-sh/bun/releases/latest/download/bun-linux-${BUN_ARCH}.zip" && \
    unzip bun-linux-${BUN_ARCH}.zip && \
    mv bun-linux-${BUN_ARCH}/bun /usr/local/bin/bun && \
    chmod +x /usr/local/bin/bun

COPY package.json bun.lock ./
RUN bun install

COPY . .
RUN chmod +x /app/entrypoint.sh

VOLUME /data
ENV DB_FILE_NAME=/data/db.sqlite

CMD [ "/app/entrypoint.sh" ]
