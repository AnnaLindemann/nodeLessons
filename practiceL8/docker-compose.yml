services:
  mysql:
    image: mysql:8.0
    container_name: p8-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    ports:
      - "${DB_PORT}:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data: