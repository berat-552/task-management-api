FROM node:17

WORKDIR /usr/src/app

# Copy package json files
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy source files to the working directory
COPY . .

# build the source code
RUN yarn build

# Expose the API port
EXPOSE 5001

# Define cmmand to run application
CMD [ "yarn", "start" ]