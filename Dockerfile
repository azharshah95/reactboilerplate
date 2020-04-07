FROM alpine:latest

# upgrade and update
RUN apk update && apk upgrade

# install bash shell
RUN apk add bash
RUN bash && echo bash installed

# install nodejs and npm
RUN apk add nodejs npm

# install Git Source Control
RUN apk add git

# check Git source control version
RUN git --version

# create directory
RUN cd usr
RUN mkdir -p src/app
RUN pwd

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# RUN npm install react-scripts -g
RUN npm install
RUN npm run build
RUN npm install -g serve

ENV PORT 3000

EXPOSE ${PORT}

RUN echo ${PORT}

# RUN serve -l ${PORT} build
# CMD [ "serve", "-l", '${PORT}', "build" ]
# CMD [ "/bin/bash", "serve -l", "${PORT}", "build" ]
# CMD [ "serve", "build" ]
CMD [ "/bin/bash", "-c", "serve -l ${PORT} build" ]
# CMD [ "npm", "start" ]

# RUN bash --version
# RUN cd usr/src/app && pwd