FROM postgres:12

# Sao chép tệp SQL vào thư mục /docker-entrypoint-initdb.d trong hình ảnh
COPY migrations/sqls/*.sql /docker-entrypoint-initdb.d/
COPY migrations/sqls/*.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/docker-entrypoint.sh
RUN chmod 755 /docker-entrypoint-initdb.d
