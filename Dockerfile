FROM continuumio/anaconda3:latest

RUN apt-get update && apt-get install -y \
    build-essential \
    ca-certificates \
    curl \
    sudo \
    openssl \
    libssl-dev libffi-dev \
    --no-install-recommends

RUN apt-get update && apt-get install -y postgresql-client

# Create directory for app
RUN mkdir /app

# Set as current directory for RUN, ADD, COPY commands
WORKDIR /app

# Add to PATH
ENV PATH /app:$PATH

# Add requirements.txt from upstream
ADD requirements.txt /app /
RUN pip install -r /app/requirements.txt

ADD engine_call.py /app /
ADD openings.py /app /
ADD our_engine.py /app /

# User defined requirements
# RUN make init

EXPOSE 5000
CMD [ "python3", "-m" , "flask", "run", "--host","0.0.0.0","--port","5000"]