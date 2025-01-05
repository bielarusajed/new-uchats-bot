FROM oven/bun:1

VOLUME /app/data
ENV DB_FILE_NAME=/app/data/db.sqlite

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "src/index.ts"]
