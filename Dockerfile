FROM nginx:alpine

# Config de servidor estático (cache, 404, bloqueio de dotfiles)
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Conteúdo do site (o .dockerignore exclui .git, Dockerfile, compose, *.md)
COPY . /usr/share/nginx/html

# deploy/ entra no contexto (p/ o COPY acima da conf) mas não deve ir pro webroot
RUN rm -rf /usr/share/nginx/html/deploy
