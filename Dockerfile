FROM httpd:2.4

RUN apt-get update

# Installing Node.js 8
RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs

# Installing Chrome dependencies
RUN apt-get install -y \
    libpangocairo-1.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libgconf2-4 libasound2 \
    libatk1.0-0 libgtk-3-0

ENV NODE_ENV local

COPY app /usr/local/apache2/htdocs/

COPY build /tmp/build
RUN cat /tmp/build/mod_status.conf >> /usr/local/apache2/conf/httpd.conf
RUN cat /tmp/build/env_config.conf >> /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs/

RUN npm install && npm run build

EXPOSE 80
