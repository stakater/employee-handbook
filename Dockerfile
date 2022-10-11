FROM python:3.8-alpine

LABEL name="Stakater Employee Handbook" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Stakater Employee Handbook"

RUN pip3 install mkdocs-material mkdocs-mermaid2-plugin

# Set workdir
RUN mkdir -p $HOME/handbook
WORKDIR $HOME/handbook

# Copy the entire handbook
COPY --chown=1001:root . .

# Build the handbook
RUN mkdocs build

# Set non-root user
USER 1001

EXPOSE 8000
CMD ["python", "-m", "http.server", "8000", "-d", "./site"]
