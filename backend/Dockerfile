# Use the official Python 3.8 image as the base image
FROM python:3.10.7-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install Python dependencies using pip
RUN pip install -r requirements.txt

# Expose the port that your FastAPI app is running on
EXPOSE 8000

# Copy the entire backend directory into the container
COPY . .

# Start the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
