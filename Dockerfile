FROM nginx:alpine

# Config de servidor estático (cache, 404, bloqueio de dotfiles)
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Conteúdo do site (o .dockerignore exclui .git, deploy/, compose etc.)
COPY . /usr/share/nginx/html
