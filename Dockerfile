FROM oven/bun:1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends python3 sqlite3 libsqlite3-dev make g++ && apt-get clean

COPY package.json bun.lock ./
RUN bun install

COPY . .
RUN chmod +x entrypoint.sh

VOLUME /app/data
ENV DB_FILE_NAME=/app/data/db.sqlite

ENTRYPOINT [ "entrypoint.sh" ]
