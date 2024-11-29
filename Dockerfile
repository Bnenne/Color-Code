# Step 1: Use a Node.js base image for building the app
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project directory
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use an Nginx base image to serve the built app
FROM nginx:stable-alpine

# Step 8: Copy the build output to the Nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port that Nginx will use
EXPOSE 5173

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]