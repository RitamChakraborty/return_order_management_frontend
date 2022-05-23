FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY /dist/return_order_management .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
