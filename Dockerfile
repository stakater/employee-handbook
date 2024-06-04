FROM python:3.12-alpine as builder

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY --chown=1001:root . .

RUN pip3 install -r theme_common/requirements.txt

# Combine Theme Resources
RUN python theme_common/scripts/combine_theme_resources.py theme_common/resources theme_override/resources dist/_theme
# Produce mkdocs file
RUN python theme_common/scripts/combine_mkdocs_config_yaml.py theme_common/mkdocs.yml theme_override/mkdocs.yml mkdocs.yml

# build the docs
RUN mkdocs build

FROM nginxinc/nginx-unprivileged:1.27-alpine as deploy
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
