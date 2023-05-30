FROM python:3.11-alpine as builder

RUN pip3 install mkdocs-material mkdocs-mermaid2-plugin

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY --chown=1001:root . .

# build the docs
RUN mkdocs build

FROM nginxinc/nginx-unprivileged:1.25-alpine as deploy
COPY --from=builder $HOME/application/site/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/

# set non-root user
USER 1001

LABEL name="Stakater Employee Handbook" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Stakater Employee Handbook"

EXPOSE 8080:8080/tcp

CMD ["nginx", "-g", "daemon off;"]
