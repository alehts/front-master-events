# pull official base image
FROM node:21-alpine

# set working directory
WORKDIR /app

# add app
COPY . .

RUN env $(grep -v '^#' .env | xargs)

RUN npm install -g serve

EXPOSE 3000

# start app
CMD serve -s build