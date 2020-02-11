FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy over the working HEAD we downloaded from S3
COPY . .


# Run install commands if we have them
RUN npm install --prefix frontend
RUN npm install --prefix backend

# Start backend and frontend
CMD ./startAll.sh
