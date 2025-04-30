FROM python:3.13-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache bash gcc musl-dev libpq-dev

RUN pip install --no-cache-dir poetry poetry-plugin-shell

WORKDIR /app

COPY . /app/

RUN poetry install --no-root

CMD ["sh", "/app/entrypoint.sh"]