# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Install necessary packages
RUN apt-get update && apt-get install -y procps curl

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port that Flask will listen on
EXPOSE 8199

# Command to run the application
CMD ["python", "__init__.py"]