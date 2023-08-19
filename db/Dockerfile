FROM --platform=linux/x86_64 mysql:8.0

ENV TZ=Asia/Tokyo
# COPY init/* /docker-entrypoint-initdb.d/
COPY my.conf /etc/mysql/conf.d/my.conf

CMD ["mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci", "--default-authentication-plugin=mysql_native_password","--sort_buffer_size=1073741824"]