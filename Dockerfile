FROM node:16 as node-builder
FROM ruby:3.3 as ruby-builder

RUN mkdir -p /opt

COPY --from=node-builder /usr/local/bin/node /usr/local/bin
COPY --from=node-builder /opt/yarn-v1.22.19 /opt/yarn

RUN gem install slim sass

RUN ln -s /opt/yarn/bin/yarn /usr/local/bin

RUN yarn global add grunt-cli

WORKDIR /savizankun

RUN yarn install