FROM oven/bun:1

VOLUME /app/data
ENV DB_FILE_NAME=/app/data/db.sqlite

WORKDIR /app

COPY . .

RUN bun install --production

CMD ["bun", "src/index.ts"]
