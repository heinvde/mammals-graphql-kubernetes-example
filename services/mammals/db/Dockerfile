FROM mongo:5.0

ENV MONGO_DATABASE_NAME test

COPY . /data/app

COPY ./import-data.sh /docker-entrypoint-initdb.d

EXPOSE 27017